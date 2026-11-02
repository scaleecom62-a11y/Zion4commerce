"use client";

import { useEffect, useRef, useState } from "react";
import { SiteFooter, SiteHeader, colorVars } from "@/components/site/Chrome";
import { Motion } from "@/components/site/Motion";
import { PageRenderer } from "@/components/site/PageRenderer";
import type { FromPreview, ToPreview } from "./protocol";

type RenderState = Extract<ToPreview, { type: "z-render" }>;

export function PreviewFrame() {
  const [state, setState] = useState<RenderState | null>(null);
  const hasState = state !== null;
  const [selected, setSelected] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const post = (m: FromPreview) => window.parent.postMessage(m, window.location.origin);
    const onMessage = (e: MessageEvent<ToPreview>) => {
      if (e.origin !== window.location.origin || !e.data || typeof e.data !== "object") return;
      if (e.data.type === "z-render") setState(e.data);
      if (e.data.type === "z-highlight") {
        setSelected(e.data.sectionId);
        if (e.data.scroll && e.data.sectionId) {
          document.querySelector(`[data-section-id="${CSS.escape(e.data.sectionId)}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    // In the editor, clicks select instead of navigating, and forms never submit.
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || !rootRef.current?.contains(t)) return;
      const interactive = t.closest("input, select, textarea, label, summary");
      if (t.closest("a, button") || !interactive) e.preventDefault();
      const section = t.closest<HTMLElement>("[data-section-id]");
      const fieldEl = t.closest<HTMLElement>("[data-field]");
      const region = t.closest<HTMLElement>("[data-region]")?.dataset.region as "header" | "footer" | undefined;
      post({ type: "z-select", sectionId: section?.dataset.sectionId ?? null, field: section ? (fieldEl?.dataset.field ?? null) : null, region: region ?? null });
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("message", onMessage);
    window.addEventListener("click", onClick, true);
    window.addEventListener("submit", onSubmit, true);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  // Announce readiness until the editor answers: the editor may start listening after this frame loads.
  useEffect(() => {
    if (hasState) return;
    const send = () => window.parent.postMessage({ type: "z-ready" } satisfies FromPreview, window.location.origin);
    send();
    const t = window.setInterval(send, 250);
    return () => window.clearInterval(t);
  }, [hasState]);

  if (!state) {
    return <p style={{ padding: 24, fontFamily: "system-ui" }}>Loading preview…</p>;
  }

  return (
    <div ref={rootRef} className="site" style={colorVars(state.settings)}>
      <style>{`
        .z-selectable { position: relative; cursor: pointer; }
        .z-selectable::after { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 50; outline: 2px solid transparent; outline-offset: -2px; transition: outline-color 120ms ease; }
        .z-selectable:hover::after { outline-color: rgb(37 99 235 / 0.55); }
        .z-selectable[data-selected="true"]::after { outline: 3px solid rgb(37 99 235); }
        [data-region] { cursor: pointer; }
      `}</style>
      <SiteHeader site={state.settings} />
      <main id="main">
        <PageRenderer page={state.page} site={state.settings} data={{ team: state.team }} selectable selectedId={selected} />
      </main>
      <SiteFooter site={state.settings} />
      <Motion />
    </div>
  );
}
