"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { publishSite, saveDraft, signOut } from "@/app/admin/actions";
import type { TeamMember } from "@/components/site/shared";
import { isValidSlug } from "@/lib/content/normalise";
import { SECTION_DEFINITIONS, SECTION_MAP } from "@/lib/content/sections";
import type { PageContent, SectionInstance, SiteContent } from "@/lib/content/schema";
import { pagePath } from "@/lib/content/schema";
import { setAt, uid } from "@/lib/editor/paths";
import { Fields, type FieldCtx } from "./FieldEditor";
import { HistoryPanel, LeadsPanel, TeamPanel } from "./Panels";
import type { FromPreview, ToPreview } from "./protocol";
import { PAGE_FIELDS, SETTINGS_GROUPS } from "./settings-fields";

type Tab = "sections" | "pages" | "settings" | "team" | "leads" | "history";
type Selection = { kind: "section"; id: string; field?: string } | { kind: "settings"; group: string } | { kind: "page" } | null;
type SaveState = "saved" | "dirty" | "saving" | "error" | "demo";
type Device = "desktop" | "tablet" | "phone";

const DEVICE_WIDTH: Record<Device, number> = { desktop: 1440, tablet: 768, phone: 390 };

const btn = "inline-flex items-center justify-center gap-1.5 rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-[13px] font-medium text-neutral-800 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40";
const iconBtn = "inline-flex h-7 w-7 items-center justify-center rounded-md text-[13px] text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-30";

function sectionTitle(s: SectionInstance): string {
  const def = SECTION_MAP[s.type];
  const st = s.settings;
  const text = [st.heading, st.title, st.line1 && `${st.line1} ${st.line2 ?? ""}`, st.claim].find((x) => typeof x === "string" && x.trim());
  return (text as string | undefined)?.trim() || def?.label || s.type;
}

export function Editor({
  initial,
  team,
  demo,
  editorName,
}: {
  initial: SiteContent;
  team: TeamMember[];
  demo: boolean;
  editorName: string;
}) {
  const [site, setSite] = useState<SiteContent>(initial);
  const [past, setPast] = useState<SiteContent[]>([]);
  const [future, setFuture] = useState<SiteContent[]>([]);
  const [pageSlug, setPageSlug] = useState("home");
  const [tab, setTab] = useState<Tab>("sections");
  const [selection, setSelection] = useState<Selection>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [saveState, setSaveState] = useState<SaveState>(demo ? "demo" : "saved");
  const [toast, setToast] = useState<{ text: string; tone: "ok" | "error" } | null>(null);
  const [adding, setAdding] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 1000, h: 800 });
  const previewReady = useRef(false);
  const lastPush = useRef<{ key: string; at: number } | null>(null);
  const firstRender = useRef(true);

  const page = site.pages.find((p) => p.slug === pageSlug) ?? site.pages[0];
  const pageIndex = site.pages.indexOf(page);

  const notify = useCallback((text: string, tone: "ok" | "error" = "ok") => {
    setToast({ text, tone });
    window.setTimeout(() => setToast((t) => (t?.text === text ? null : t)), 4000);
  }, []);

  /** Every change goes through here, so undo, autosave and the preview stay in step. */
  const update = useCallback(
    (next: SiteContent, coalesceKey?: string) => {
      const now = Date.now();
      const coalesce = coalesceKey && lastPush.current && lastPush.current.key === coalesceKey && now - lastPush.current.at < 900;
      if (!coalesce) {
        setPast((p) => [...p.slice(-99), site]);
        setFuture([]);
      }
      lastPush.current = coalesceKey ? { key: coalesceKey, at: now } : null;
      setSite(next);
      if (!demo) setSaveState("dirty");
    },
    [site, demo],
  );

  const undo = useCallback(() => {
    if (!past.length) return;
    const prev = past[past.length - 1];
    setPast(past.slice(0, -1));
    setFuture([site, ...future]);
    setSite(prev);
    if (!demo) setSaveState("dirty");
    lastPush.current = null;
  }, [past, future, site, demo]);

  const redo = useCallback(() => {
    if (!future.length) return;
    const [next, ...rest] = future;
    setFuture(rest);
    setPast([...past, site]);
    setSite(next);
    if (!demo) setSaveState("dirty");
    lastPush.current = null;
  }, [past, future, site, demo]);

  const updatePage = useCallback(
    (fn: (p: PageContent) => PageContent, key?: string) => {
      const pages = site.pages.map((p, i) => (i === pageIndex ? fn(p) : p));
      update({ ...site, pages }, key);
    },
    [site, pageIndex, update],
  );

  // ---------- saving ----------
  const save = useCallback(async () => {
    if (demo) return;
    setSaveState("saving");
    const res = await saveDraft(site);
    if (res.ok) setSaveState("saved");
    else {
      setSaveState("error");
      notify(res.error, "error");
    }
  }, [site, demo, notify]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (demo || saveState !== "dirty") return;
    const t = window.setTimeout(() => void save(), 1500);
    return () => window.clearTimeout(t);
  }, [site, saveState, demo, save]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (saveState === "dirty" || saveState === "saving") e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [saveState]);

  async function publish() {
    const note = window.prompt("What changed? (optional, shown in History)", "") ?? null;
    if (note === null) return;
    setPublishing(true);
    const res = await publishSite(site, note);
    setPublishing(false);
    if (res.ok) {
      setSaveState("saved");
      notify("Published. The live site now shows these changes.");
    } else notify(res.error, "error");
  }

  // ---------- preview ----------
  const sendToPreview = useCallback((m: ToPreview) => {
    frame.current?.contentWindow?.postMessage(m, window.location.origin);
  }, []);

  useEffect(() => {
    if (!previewReady.current) return;
    const id = requestAnimationFrame(() => sendToPreview({ type: "z-render", settings: site.settings, page, team }));
    return () => cancelAnimationFrame(id);
  }, [site, page, team, sendToPreview]);

  useEffect(() => {
    if (!previewReady.current) return;
    sendToPreview({ type: "z-highlight", sectionId: selection?.kind === "section" ? selection.id : null, scroll: false });
  }, [selection, sendToPreview]);

  useEffect(() => {
    const onMessage = (e: MessageEvent<FromPreview>) => {
      if (e.origin !== window.location.origin || !e.data || typeof e.data !== "object") return;
      if (e.data.type === "z-ready") {
        previewReady.current = true;
        sendToPreview({ type: "z-render", settings: site.settings, page, team });
      }
      if (e.data.type === "z-select") {
        if (e.data.region) {
          setTab("settings");
          setSelection({ kind: "settings", group: e.data.region });
        } else if (e.data.sectionId) {
          setTab("sections");
          setSelection({ kind: "section", id: e.data.sectionId, field: e.data.field ?? undefined });
        }
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [site.settings, page, team, sendToPreview]);

  // Bring the clicked field into view in the inspector.
  useEffect(() => {
    if (selection?.kind !== "section" || !selection.field) return;
    const t = window.setTimeout(() => {
      const el = document.querySelector<HTMLElement>(`[data-inspector] [data-editor-field="${CSS.escape(selection.field!)}"]`);
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      el?.querySelector<HTMLElement>("input, textarea, select, button")?.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(t);
  }, [selection]);

  // The preview renders at the device's real width and is scaled down to fit.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setStageSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [tab]);

  // ---------- keyboard ----------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const k = e.key.toLowerCase();
      if (k === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((k === "z" && e.shiftKey) || k === "y") {
        e.preventDefault();
        redo();
      } else if (k === "s") {
        e.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo, save]);

  // ---------- section operations ----------
  const selectedSection = selection?.kind === "section" ? page.sections.find((s) => s.id === selection.id) : undefined;

  function addSection(type: string) {
    const def = SECTION_MAP[type];
    const inst: SectionInstance = { id: uid(type), type, settings: structuredClone(def.defaults) };
    const at = selectedSection ? page.sections.indexOf(selectedSection) + 1 : page.sections.length;
    updatePage((p) => ({ ...p, sections: [...p.sections.slice(0, at), inst, ...p.sections.slice(at)] }));
    setSelection({ kind: "section", id: inst.id });
    setAdding(false);
    window.setTimeout(() => sendToPreview({ type: "z-highlight", sectionId: inst.id, scroll: true }), 120);
  }

  function moveSection(id: string, to: number) {
    updatePage((p) => {
      const from = p.sections.findIndex((s) => s.id === id);
      if (from < 0 || to < 0 || to >= p.sections.length) return p;
      const copy = [...p.sections];
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return { ...p, sections: copy };
    });
  }

  function duplicateSection(id: string) {
    updatePage((p) => {
      const i = p.sections.findIndex((s) => s.id === id);
      const src = p.sections[i];
      const copy: SectionInstance = { ...structuredClone(src), id: uid(src.type) };
      return { ...p, sections: [...p.sections.slice(0, i + 1), copy, ...p.sections.slice(i + 1)] };
    });
  }

  function removeSection(id: string) {
    const s = page.sections.find((x) => x.id === id);
    if (!s || !confirm(`Delete the section “${sectionTitle(s)}”? You can undo this.`)) return;
    updatePage((p) => ({ ...p, sections: p.sections.filter((x) => x.id !== id) }));
    if (selection?.kind === "section" && selection.id === id) setSelection(null);
  }

  function toggleHidden(id: string) {
    updatePage((p) => ({ ...p, sections: p.sections.map((x) => (x.id === id ? { ...x, hidden: !x.hidden } : x)) }));
  }

  // ---------- page operations ----------
  function addPage() {
    const title = window.prompt("Name of the new page", "New page");
    if (!title) return;
    const base = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "page";
    let slug = base;
    for (let n = 2; site.pages.some((p) => p.slug === slug); n++) slug = `${base}-${n}`;
    if (!isValidSlug(slug)) {
      notify("That name can't be used as a page address. Try another.", "error");
      return;
    }
    const newPage: PageContent = {
      slug,
      title,
      seo: { title, description: "" },
      sections: [
        { id: uid("page_intro"), type: "page_intro", settings: { ...structuredClone(SECTION_MAP.page_intro.defaults), title } },
        { id: uid("rich_text"), type: "rich_text", settings: structuredClone(SECTION_MAP.rich_text.defaults) },
      ],
    };
    update({ ...site, pages: [...site.pages, newPage] });
    setPageSlug(slug);
    setTab("sections");
    setSelection({ kind: "page" });
  }

  function renameSlug(next: string) {
    if (page.slug === "home") return;
    if (!isValidSlug(next)) {
      notify("Use lowercase letters, numbers and dashes only.", "error");
      return;
    }
    if (site.pages.some((p) => p.slug === next && p !== page)) {
      notify("Another page already uses that address.", "error");
      return;
    }
    updatePage((p) => ({ ...p, slug: next }));
    setPageSlug(next);
  }

  function deletePage() {
    if (["home", "contact"].includes(page.slug)) return;
    if (!confirm(`Delete the page “${page.title}”? It disappears from the live site when you publish.`)) return;
    update({ ...site, pages: site.pages.filter((p) => p !== page) });
    setPageSlug("home");
    setSelection(null);
  }

  // ---------- inspector ----------
  const pageLinks = useMemo(() => site.pages.map((p) => ({ label: p.title, href: pagePath(p.slug) })), [site.pages]);
  const baseCtx: Omit<FieldCtx, "value" | "onChange"> = { colors: site.settings.colors, pageLinks, demo };

  function inspector() {
    if (selection?.kind === "section" && selectedSection) {
      const def = SECTION_MAP[selectedSection.type];
      const idx = page.sections.indexOf(selectedSection);
      return (
        <>
          <InspectorHead title={def?.label ?? selectedSection.type} subtitle={def?.description} onClose={() => setSelection(null)} />
          <div className="space-y-4 p-4">
            {selectedSection.hidden && <p className="rounded-md bg-amber-50 px-3 py-2 text-[12px] text-amber-900">This section is hidden. It won&apos;t show on the live site.</p>}
            <Fields
              fields={def?.fields ?? []}
              ctx={{
                ...baseCtx,
                focus: selection.field,
                value: selectedSection.settings,
                onChange: (path, v) =>
                  updatePage(
                    (p) => ({ ...p, sections: p.sections.map((s, i) => (i === idx ? { ...s, settings: setAt(s.settings, path, v) } : s)) }),
                    `${selectedSection.id}:${path}`,
                  ),
              }}
            />
          </div>
        </>
      );
    }
    if (selection?.kind === "settings") {
      const group = SETTINGS_GROUPS.find((g) => g.id === selection.group) ?? SETTINGS_GROUPS[0];
      return (
        <>
          <InspectorHead title={group.title} subtitle="Applies to every page." onClose={() => setSelection(null)} />
          <div className="p-4">
            <Fields
              fields={group.fields}
              ctx={{
                ...baseCtx,
                value: site.settings,
                onChange: (path, v) => update({ ...site, settings: setAt(site.settings, path, v) }, `settings:${path}`),
              }}
            />
          </div>
        </>
      );
    }
    if (selection?.kind === "page") {
      return (
        <>
          <InspectorHead title={`Page: ${page.title}`} subtitle={`Lives at ${pagePath(page.slug)}`} onClose={() => setSelection(null)} />
          <div className="space-y-4 p-4">
            <Fields fields={PAGE_FIELDS} ctx={{ ...baseCtx, value: page, onChange: (path, v) => updatePage((p) => setAt(p, path, v), `page:${path}`) }} />
            {page.slug !== "home" && (
              <SlugField key={page.slug} slug={page.slug} onCommit={renameSlug} />
            )}
            {!["home", "contact"].includes(page.slug) && (
              <button type="button" onClick={deletePage} className="rounded-md border border-red-300 px-3 py-1.5 text-[13px] font-semibold text-red-700 hover:bg-red-50">
                Delete this page
              </button>
            )}
          </div>
        </>
      );
    }
    return (
      <div className="p-5 text-[13px] leading-relaxed text-neutral-600">
        <p className="font-semibold text-neutral-900">Click anything in the preview to edit it.</p>
        <p className="mt-2">Or pick a section on the left. Changes save as a draft automatically. Visitors see them only after you press Publish.</p>
        <p className="mt-4 text-[12px] text-neutral-500">Shortcuts: ⌘/Ctrl+Z undo · ⌘/Ctrl+Shift+Z redo · ⌘/Ctrl+S save</p>
      </div>
    );
  }

  const workspaceTab = tab === "team" || tab === "leads" || tab === "history";

  return (
    <div className="flex h-dvh flex-col bg-neutral-100 font-sans text-neutral-900">
      {/* top bar */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-3">
        <div className="flex items-center gap-2 pr-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.settings.logo.src} alt="" className="h-7 w-7 bg-transparent" />
          <span className="text-[14px] font-semibold">{site.settings.siteName}</span>
          <span className="hidden text-[13px] text-neutral-500 sm:inline">Website editor</span>
        </div>
        <label className="sr-only" htmlFor="page-picker">
          Page
        </label>
        <select
          id="page-picker"
          value={page.slug}
          onChange={(e) => {
            setPageSlug(e.target.value);
            setSelection(null);
            setTab("sections");
          }}
          className="rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-[13px] font-medium"
        >
          {site.pages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title} ({pagePath(p.slug)})
            </option>
          ))}
        </select>
        <div className="mx-auto flex items-center gap-1 rounded-md bg-neutral-100 p-0.5" role="group" aria-label="Preview size">
          {(["desktop", "tablet", "phone"] as Device[]).map((d) => (
            <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)} className={`rounded px-2.5 py-1 text-[12px] font-medium capitalize ${device === d ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-600 hover:text-neutral-900"}`}>
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className={iconBtn} onClick={undo} disabled={!past.length} aria-label="Undo" title="Undo">
            ↶
          </button>
          <button type="button" className={iconBtn} onClick={redo} disabled={!future.length} aria-label="Redo" title="Redo">
            ↷
          </button>
        </div>
        <SaveBadge state={saveState} />
        <a href={pagePath(page.slug)} target="_blank" rel="noreferrer" className={btn}>
          View live
        </a>
        <button type="button" onClick={() => void publish()} disabled={demo || publishing || saveState === "saving"} className="rounded-md bg-[#de194b] px-3.5 py-1.5 text-[13px] font-semibold text-white hover:bg-[#c3123f] disabled:cursor-not-allowed disabled:opacity-50">
          {publishing ? "Publishing…" : "Publish"}
        </button>
        <form action={signOut}>
          <button type="submit" className={iconBtn} title={`Signed in as ${editorName}. Sign out`} aria-label="Sign out">
            ⎋
          </button>
        </form>
      </header>

      {demo && (
        <p className="shrink-0 bg-amber-100 px-4 py-1.5 text-center text-[12px] font-medium text-amber-900">
          Demo mode: the database isn&apos;t connected, so nothing is saved or published. Everything else works.
        </p>
      )}

      <div className="flex min-h-0 flex-1">
        {/* left: navigation */}
        <nav className="flex w-[280px] shrink-0 flex-col border-r border-neutral-200 bg-white" aria-label="Editor">
          <div className="grid grid-cols-3 gap-1 border-b border-neutral-200 p-2" role="tablist">
            {(
              [
                ["sections", "Sections"],
                ["pages", "Pages"],
                ["settings", "Site"],
                ["team", "Team"],
                ["leads", "Leads"],
                ["history", "History"],
              ] as [Tab, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => {
                  setTab(id);
                  if (id === "settings") setSelection({ kind: "settings", group: "brand" });
                }}
                className={`rounded-md px-2 py-1.5 text-[12px] font-semibold ${tab === id ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-100"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {tab === "sections" && (
              <>
                <RowButton active={selection?.kind === "settings" && selection.group === "header"} onClick={() => setSelection({ kind: "settings", group: "header" })} label="Header" note="All pages" />
                <ol className="my-1 space-y-0.5" aria-label={`Sections on ${page.title}`}>
                  {page.sections.map((s, i) => {
                    const active = selection?.kind === "section" && selection.id === s.id;
                    return (
                      <li
                        key={s.id}
                        draggable
                        onDragStart={() => setDragId(s.id)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          if (dragId && dragId !== s.id) moveSection(dragId, i);
                          setDragId(null);
                        }}
                        className={`group flex items-center gap-1 rounded-md pl-1 pr-1 ${active ? "bg-blue-50 ring-1 ring-blue-300" : "hover:bg-neutral-50"} ${dragId === s.id ? "opacity-50" : ""}`}
                      >
                        <span className="cursor-grab select-none px-1 text-neutral-400" aria-hidden="true" title="Drag to reorder">
                          ⋮⋮
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelection({ kind: "section", id: s.id });
                            sendToPreview({ type: "z-highlight", sectionId: s.id, scroll: true });
                          }}
                          className={`min-w-0 flex-1 truncate py-1.5 text-left text-[13px] ${s.hidden ? "text-neutral-400" : "text-neutral-900"}`}
                        >
                          <span className="block truncate font-medium">{sectionTitle(s)}</span>
                          <span className="block truncate text-[11px] text-neutral-500">
                            {s.hidden ? "Hidden · " : ""}
                            {SECTION_MAP[s.type]?.label}
                          </span>
                        </button>
                        <div className={`${active ? "flex" : "hidden"} group-hover:flex group-focus-within:flex`}>
                          <button type="button" className={iconBtn} aria-label={`Move ${sectionTitle(s)} up`} disabled={i === 0} onClick={() => moveSection(s.id, i - 1)}>
                            ↑
                          </button>
                          <button type="button" className={iconBtn} aria-label={`Move ${sectionTitle(s)} down`} disabled={i === page.sections.length - 1} onClick={() => moveSection(s.id, i + 1)}>
                            ↓
                          </button>
                          <button type="button" className={iconBtn} aria-label={s.hidden ? `Show ${sectionTitle(s)}` : `Hide ${sectionTitle(s)}`} onClick={() => toggleHidden(s.id)}>
                            {s.hidden ? "◌" : "◉"}
                          </button>
                          <button type="button" className={iconBtn} aria-label={`Duplicate ${sectionTitle(s)}`} onClick={() => duplicateSection(s.id)}>
                            ⧉
                          </button>
                          <button type="button" className={iconBtn} aria-label={`Delete ${sectionTitle(s)}`} onClick={() => removeSection(s.id)}>
                            ✕
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ol>
                {adding ? (
                  <div className="rounded-md border border-neutral-200 p-2">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-neutral-700">Add a section{selectedSection ? " after the selected one" : ""}</p>
                      <button type="button" className={iconBtn} aria-label="Cancel" onClick={() => setAdding(false)}>
                        ✕
                      </button>
                    </div>
                    <ul className="space-y-0.5">
                      {SECTION_DEFINITIONS.map((d) => (
                        <li key={d.type}>
                          <button type="button" onClick={() => addSection(d.type)} className="w-full rounded-md px-2 py-1.5 text-left hover:bg-neutral-100">
                            <span className="block text-[13px] font-medium">{d.label}</span>
                            <span className="block text-[11px] leading-snug text-neutral-500">{d.description}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <button type="button" onClick={() => setAdding(true)} className="w-full rounded-md border border-dashed border-neutral-300 px-2 py-2 text-[13px] font-semibold text-blue-700 hover:bg-blue-50">
                    + Add section
                  </button>
                )}
                <RowButton active={selection?.kind === "settings" && selection.group === "footer"} onClick={() => setSelection({ kind: "settings", group: "footer" })} label="Footer" note="All pages" />
                <RowButton active={selection?.kind === "page"} onClick={() => setSelection({ kind: "page" })} label="Page settings" note="Name, address, search" />
              </>
            )}

            {tab === "pages" && (
              <>
                <ul className="space-y-0.5">
                  {site.pages.map((p) => (
                    <li key={p.slug}>
                      <RowButton
                        active={p.slug === page.slug}
                        onClick={() => {
                          setPageSlug(p.slug);
                          setTab("sections");
                          setSelection(null);
                        }}
                        label={p.title}
                        note={pagePath(p.slug)}
                      />
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={addPage} className="mt-2 w-full rounded-md border border-dashed border-neutral-300 px-2 py-2 text-[13px] font-semibold text-blue-700 hover:bg-blue-50">
                  + Add page
                </button>
              </>
            )}

            {tab === "settings" && (
              <ul className="space-y-0.5">
                {SETTINGS_GROUPS.map((g) => (
                  <li key={g.id}>
                    <RowButton active={selection?.kind === "settings" && selection.group === g.id} onClick={() => setSelection({ kind: "settings", group: g.id })} label={g.title} />
                  </li>
                ))}
              </ul>
            )}

            {workspaceTab && <p className="p-2 text-[12px] leading-relaxed text-neutral-600">{tab === "team" ? "Choose who appears on the website and in what order. Names, titles and photos come from Tasqr." : tab === "leads" ? "Every audit request from the website, newest first." : "Every publish is saved. Load an older version into the editor, check it, then publish to restore it."}</p>}
          </div>
        </nav>

        {/* centre: preview or workspace */}
        <main className="relative min-w-0 flex-1 overflow-auto" aria-label={workspaceTab ? tab : "Preview"}>
          {workspaceTab ? (
            <div className="mx-auto max-w-5xl p-6">
              {tab === "team" && <TeamPanel demo={demo} notify={notify} />}
              {tab === "leads" && <LeadsPanel demo={demo} />}
              {tab === "history" && (
                <HistoryPanel
                  demo={demo}
                  onLoad={(content) => {
                    update(content);
                    setTab("sections");
                    notify("Older version loaded as your draft. Publish to make it live.");
                  }}
                />
              )}
            </div>
          ) : (
            <div ref={stage} className="flex h-full justify-center overflow-hidden p-3">
              {(() => {
                const w = DEVICE_WIDTH[device];
                const scale = Math.min(1, Math.max(0.2, (stageSize.w - 2) / w));
                const h = Math.max(200, stageSize.h - 2);
                return (
                  <div style={{ width: w * scale, height: h }} className="shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-white">
                    <iframe
                      ref={frame}
                      title="Page preview"
                      src="/admin/preview"
                      style={{ width: w, height: h / scale, transform: `scale(${scale})`, transformOrigin: "top left", border: 0, display: "block" }}
                    />
                  </div>
                );
              })()}
            </div>
          )}
        </main>

        {/* right: inspector */}
        {!workspaceTab && (
          <aside data-inspector className="w-[340px] shrink-0 overflow-y-auto border-l border-neutral-200 bg-white" aria-label="Settings for the selection">
            {inspector()}
          </aside>
        )}
      </div>

      {toast && (
        <div role="status" className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md px-4 py-2 text-[13px] font-medium text-white shadow-lg ${toast.tone === "error" ? "bg-red-700" : "bg-neutral-900"}`}>
          {toast.text}
        </div>
      )}
    </div>
  );
}

function InspectorHead({ title, subtitle, onClose }: { title: string; subtitle?: string; onClose: () => void }) {
  return (
    <div className="sticky top-0 z-10 flex items-start justify-between gap-2 border-b border-neutral-200 bg-white px-4 py-3">
      <div>
        <h2 className="text-[14px] font-semibold">{title}</h2>
        {subtitle && <p className="mt-0.5 text-[12px] leading-snug text-neutral-500">{subtitle}</p>}
      </div>
      <button type="button" className={iconBtn} onClick={onClose} aria-label="Close settings">
        ✕
      </button>
    </div>
  );
}

function RowButton({ active, onClick, label, note }: { active: boolean; onClick: () => void; label: string; note?: string }) {
  return (
    <button type="button" onClick={onClick} className={`w-full rounded-md px-2 py-1.5 text-left ${active ? "bg-blue-50 ring-1 ring-blue-300" : "hover:bg-neutral-50"}`}>
      <span className="block text-[13px] font-medium">{label}</span>
      {note && <span className="block text-[11px] text-neutral-500">{note}</span>}
    </button>
  );
}

function SlugField({ slug, onCommit }: { slug: string; onCommit: (s: string) => void }) {
  const [v, setV] = useState(slug);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (v !== slug) onCommit(v.trim());
      }}
    >
      <label htmlFor="slug" className="mb-1 block text-[13px] font-semibold text-neutral-800">
        Page address
      </label>
      <div className="flex gap-2">
        <span className="py-1.5 text-[14px] text-neutral-500">/</span>
        <input id="slug" value={v} onChange={(e) => setV(e.target.value)} className="w-full rounded-md border border-neutral-300 px-2.5 py-1.5 text-[14px]" />
        <button type="submit" className={btn} disabled={v === slug}>
          Change
        </button>
      </div>
      <p className="mt-1 text-[12px] text-neutral-500">Changing it breaks old links to this page.</p>
    </form>
  );
}

function SaveBadge({ state }: { state: SaveState }) {
  const map: Record<SaveState, [string, string]> = {
    saved: ["Draft saved", "text-neutral-500"],
    dirty: ["Unsaved changes", "text-amber-700"],
    saving: ["Saving…", "text-neutral-500"],
    error: ["Not saved", "text-red-700"],
    demo: ["Demo: not saved", "text-amber-700"],
  };
  const [text, cls] = map[state];
  return (
    <span role="status" className={`hidden min-w-[110px] text-right text-[12px] font-medium md:inline ${cls}`}>
      {text}
    </span>
  );
}

