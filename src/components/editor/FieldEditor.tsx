"use client";

import { useId, useState } from "react";
import { FIELD_COLOR_OPTIONS, type Field, type ImageValue, type LinkValue, type Settings } from "@/lib/content/schema";
import { getAt } from "@/lib/editor/paths";
import { MediaPicker } from "./MediaPicker";

export interface FieldCtx {
  /** Root object the paths are read from. */
  value: unknown;
  /** Write one value at a dotted path, relative to the root. */
  onChange: (path: string, v: unknown) => void;
  /** Path prefix for these fields within the root. */
  prefix?: string;
  colors: Record<string, string>;
  pageLinks: { label: string; href: string }[];
  demo: boolean;
  /** Path the editor wants opened and focused (from a click in the preview). */
  focus?: string;
}

const input =
  "w-full rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-[14px] text-neutral-900 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10";
const labelCls = "block text-[13px] font-semibold text-neutral-800 mb-1";
const helpCls = "mt-1 text-[12px] text-neutral-500";
const smallBtn =
  "inline-flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-2 py-1 text-[12px] font-medium text-neutral-800 hover:bg-neutral-50 disabled:opacity-40";

function join(prefix: string | undefined, key: string) {
  return prefix ? `${prefix}.${key}` : key;
}

export function Fields({ fields, ctx }: { fields: Field[]; ctx: FieldCtx }) {
  return (
    <div className="space-y-4">
      {fields.map((f) => (
        <FieldRow key={f.key} field={f} ctx={ctx} />
      ))}
    </div>
  );
}

function FieldRow({ field, ctx }: { field: Field; ctx: FieldCtx }) {
  const id = useId();
  const path = join(ctx.prefix, field.key);
  const v = getAt(ctx.value, path);
  const set = (nv: unknown) => ctx.onChange(path, nv);

  const wrap = (control: React.ReactNode, htmlFor?: string) => (
    <div data-editor-field={path}>
      <label className={labelCls} htmlFor={htmlFor}>
        {field.label}
      </label>
      {control}
      {"help" in field && field.help && <p className={helpCls}>{field.help}</p>}
    </div>
  );

  switch (field.type) {
    case "text": {
      const s = typeof v === "string" ? v : "";
      return wrap(
        <>
          <input id={id} className={input} value={s} onChange={(e) => set(e.target.value)} />
          {field.maxLength && s.length > field.maxLength && (
            <p className="mt-1 text-[12px] font-medium text-amber-700">
              {s.length} characters. Over {field.maxLength} may break the layout.
            </p>
          )}
        </>,
        id,
      );
    }
    case "textarea":
      return wrap(
        <textarea id={id} className={`${input} leading-snug`} rows={field.rows ?? 4} value={typeof v === "string" ? v : ""} onChange={(e) => set(e.target.value)} />,
        id,
      );
    case "number":
      return wrap(
        <input
          id={id}
          type="number"
          className={input}
          min={field.min}
          max={field.max}
          step={field.step}
          value={typeof v === "number" ? v : ""}
          onChange={(e) => set(e.target.value === "" ? 0 : e.target.valueAsNumber)}
        />,
        id,
      );
    case "toggle":
      return (
        <div data-editor-field={path} className="flex items-center justify-between gap-3">
          <label htmlFor={id} className="text-[13px] font-semibold text-neutral-800">
            {field.label}
          </label>
          <input id={id} type="checkbox" className="h-4 w-4 accent-neutral-900" checked={v === true} onChange={(e) => set(e.target.checked)} />
        </div>
      );
    case "select":
      return wrap(
        <select id={id} className={input} value={typeof v === "string" ? v : ""} onChange={(e) => set(e.target.value)}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>,
        id,
      );
    case "color": {
      const current = typeof v === "string" ? v : "";
      return (
        <div data-editor-field={path}>
          <p className={labelCls} id={id}>
            {field.label}
          </p>
          <div role="radiogroup" aria-labelledby={id} className="flex flex-wrap gap-2">
            {FIELD_COLOR_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={current === o.value}
                onClick={() => set(o.value)}
                className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-[12px] font-medium ${current === o.value ? "border-neutral-900 ring-2 ring-neutral-900/15" : "border-neutral-300"}`}
              >
                <span className="h-4 w-4 rounded-sm border border-black/10" style={{ background: ctx.colors[o.value] }} />
                {o.label}
              </button>
            ))}
          </div>
        </div>
      );
    }
    case "hex": {
      const s = typeof v === "string" ? v : "#000000";
      return wrap(
        <div className="flex items-center gap-2">
          <input type="color" aria-label={`${field.label} picker`} value={/^#[0-9a-f]{6}$/i.test(s) ? s : "#000000"} onChange={(e) => set(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-neutral-300 bg-white p-0.5" />
          <input id={id} className={`${input} font-mono`} value={s} onChange={(e) => set(e.target.value)} />
        </div>,
        id,
      );
    }
    case "link": {
      const l = (v as LinkValue | undefined) ?? { label: "", href: "" };
      const listId = `${id}-pages`;
      return (
        <fieldset data-editor-field={path} className="space-y-2">
          <legend className={labelCls}>{field.label}</legend>
          <input aria-label={`${field.label} text`} placeholder="Button or link text" className={input} value={l.label} onChange={(e) => set({ ...l, label: e.target.value })} />
          <input aria-label={`${field.label} address`} placeholder="/contact or https://…" list={listId} className={input} value={l.href} onChange={(e) => set({ ...l, href: e.target.value })} />
          <datalist id={listId}>
            {ctx.pageLinks.map((p) => (
              <option key={p.href} value={p.href}>
                {p.label}
              </option>
            ))}
          </datalist>
        </fieldset>
      );
    }
    case "image":
      return <ImageField path={path} label={field.label} value={(v as ImageValue | undefined) ?? { src: "", alt: "" }} set={set} demo={ctx.demo} />;
    case "strings":
      return <StringsField path={path} label={field.label} itemLabel={field.itemLabel} value={Array.isArray(v) ? (v as string[]) : []} set={set} />;
    case "list":
      return <ListField field={field} path={path} ctx={ctx} value={Array.isArray(v) ? (v as Settings[]) : []} set={set} />;
  }
}

function ImageField({ path, label, value, set, demo }: { path: string; label: string; value: ImageValue; set: (v: unknown) => void; demo: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <fieldset data-editor-field={path} className="space-y-2">
      <legend className={labelCls}>{label}</legend>
      <div className="flex items-start gap-3">
        <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 text-[11px] text-neutral-500">
          {value.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.src} alt="" className="h-full w-full object-cover" />
          ) : (
            "No image"
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" className={smallBtn} onClick={() => setOpen(true)}>
            {value.src ? "Change" : "Choose image"}
          </button>
          {value.src && (
            <button type="button" className={smallBtn} onClick={() => set({ src: "", alt: "" })}>
              Remove
            </button>
          )}
        </div>
      </div>
      <label htmlFor={id} className="block text-[12px] font-medium text-neutral-700">
        Description for screen readers (alt text)
      </label>
      <input id={id} className={input} value={value.alt} onChange={(e) => set({ ...value, alt: e.target.value })} placeholder="What the picture shows" />
      {open && (
        <MediaPicker
          demo={demo}
          current={value.src}
          onClose={() => setOpen(false)}
          onPick={(src, alt) => {
            set({ src, alt: value.alt || alt });
            setOpen(false);
          }}
        />
      )}
    </fieldset>
  );
}

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

function StringsField({ path, label, itemLabel, value, set }: { path: string; label: string; itemLabel: string; value: string[]; set: (v: unknown) => void }) {
  return (
    <fieldset data-editor-field={path} className="space-y-2">
      <legend className={labelCls}>{label}</legend>
      {value.map((s, i) => (
        <div key={i} className="flex items-center gap-1">
          <input aria-label={`${itemLabel} ${i + 1}`} className={input} value={s} onChange={(e) => set(value.map((x, j) => (j === i ? e.target.value : x)))} />
          <button type="button" className={smallBtn} aria-label={`Move ${itemLabel} ${i + 1} up`} disabled={i === 0} onClick={() => set(move(value, i, i - 1))}>
            ↑
          </button>
          <button type="button" className={smallBtn} aria-label={`Remove ${itemLabel} ${i + 1}`} onClick={() => set(value.filter((_, j) => j !== i))}>
            ✕
          </button>
        </div>
      ))}
      <button type="button" className={smallBtn} onClick={() => set([...value, ""])}>
        + Add {itemLabel.toLowerCase()}
      </button>
    </fieldset>
  );
}

function blankItem(fields: Field[]): Settings {
  const o: Settings = {};
  for (const f of fields) {
    if (f.type === "list" || f.type === "strings") o[f.key] = [];
    else if (f.type === "image") o[f.key] = { src: "", alt: "" };
    else if (f.type === "link") o[f.key] = { label: "", href: "" };
    else if (f.type === "toggle") o[f.key] = false;
    else if (f.type === "number") o[f.key] = 0;
    else if (f.type === "color") o[f.key] = "paper";
    else o[f.key] = "";
  }
  return o;
}

function ListField({ field, path, ctx, value, set }: { field: Extract<Field, { type: "list" }>; path: string; ctx: FieldCtx; value: Settings[]; set: (v: unknown) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const [seenFocus, setSeenFocus] = useState<string | undefined>(undefined);
  if (ctx.focus !== seenFocus) {
    // A click in the preview landed on one of this list's items: open it.
    setSeenFocus(ctx.focus);
    if (ctx.focus?.startsWith(`${path}.`)) {
      const idx = Number(ctx.focus.slice(path.length + 1).split(".")[0]);
      if (Number.isInteger(idx)) setOpen(idx);
    }
  }
  const canAdd = field.max === undefined || value.length < field.max;
  const canRemove = field.min === undefined || value.length > field.min;
  return (
    <fieldset data-editor-field={path} className="space-y-1.5">
      <legend className={labelCls}>{field.label}</legend>
      {value.map((item, i) => {
        const title = String(item[field.titleKey] ?? "") || `${field.itemLabel} ${i + 1}`;
        const isOpen = open === i;
        return (
          <div key={i} data-editor-field={`${path}.${i}`} className="rounded-md border border-neutral-200 bg-white">
            <div className="flex items-center gap-1 px-2 py-1.5">
              <button type="button" className="flex-1 truncate text-left text-[13px] font-medium text-neutral-900" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                <span aria-hidden="true" className="mr-1 inline-block w-3 text-neutral-400">
                  {isOpen ? "▾" : "▸"}
                </span>
                {title}
              </button>
              <button type="button" className={smallBtn} aria-label={`Move ${title} up`} disabled={i === 0} onClick={() => set(move(value, i, i - 1))}>
                ↑
              </button>
              <button type="button" className={smallBtn} aria-label={`Move ${title} down`} disabled={i === value.length - 1} onClick={() => set(move(value, i, i + 1))}>
                ↓
              </button>
              <button type="button" className={smallBtn} aria-label={`Duplicate ${title}`} disabled={!canAdd} onClick={() => set([...value.slice(0, i + 1), structuredClone(item), ...value.slice(i + 1)])}>
                ⧉
              </button>
              <button
                type="button"
                className={smallBtn}
                aria-label={`Remove ${title}`}
                disabled={!canRemove}
                onClick={() => {
                  if (confirm(`Remove “${title}”?`)) set(value.filter((_, j) => j !== i));
                }}
              >
                ✕
              </button>
            </div>
            {isOpen && (
              <div className="border-t border-neutral-200 p-3">
                <Fields fields={field.fields} ctx={{ ...ctx, prefix: `${path}.${i}` }} />
              </div>
            )}
          </div>
        );
      })}
      {canAdd && (
        <button
          type="button"
          className={smallBtn}
          onClick={() => {
            set([...value, blankItem(field.fields)]);
            setOpen(value.length);
          }}
        >
          + Add {field.itemLabel.toLowerCase()}
        </button>
      )}
    </fieldset>
  );
}
