"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MEDIA_BUCKET } from "@/lib/supabase/config";
import { browserClient } from "@/lib/supabase/browser";

interface MediaItem {
  name: string;
  url: string;
}

const MAX_BYTES = 8 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];

export function MediaPicker({ demo, current, onPick, onClose }: { demo: boolean; current: string; onPick: (src: string, alt: string) => void; onClose: () => void }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState(current);
  const dialog = useRef<HTMLDialogElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  const refresh = useCallback(async (): Promise<{ items?: MediaItem[]; error?: string }> => {
    const sb = browserClient();
    if (!sb || demo) return {};
    const { data, error } = await sb.storage.from(MEDIA_BUCKET).list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
    if (error) return { error: `Could not load the library: ${error.message}` };
    return {
      items: (data ?? [])
        .filter((f: { name: string }) => f.name && !f.name.startsWith("."))
        .map((f: { name: string }) => ({ name: f.name, url: sb.storage.from(MEDIA_BUCKET).getPublicUrl(f.name).data.publicUrl })),
    };
  }, [demo]);

  useEffect(() => {
    let cancelled = false;
    refresh().then((r) => {
      if (cancelled) return;
      if (r.items) setItems(r.items);
      if (r.error) setStatus(r.error);
    });
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  async function upload(file: File) {
    const sb = browserClient();
    if (!sb || demo) return;
    if (!TYPES.includes(file.type)) {
      setStatus("Use a JPG, PNG, WebP, AVIF or SVG image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setStatus("That image is over 8 MB. Export a smaller version and try again.");
      return;
    }
    setBusy(true);
    setStatus("Uploading…");
    const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
    const name = `${Date.now().toString(36)}-${safe}`;
    const { error } = await sb.storage.from(MEDIA_BUCKET).upload(name, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
    setBusy(false);
    if (error) {
      setStatus(`Upload failed: ${error.message}`);
      return;
    }
    setStatus("Uploaded.");
    const r = await refresh();
    if (r.items) setItems(r.items);
    onPick(sb.storage.from(MEDIA_BUCKET).getPublicUrl(name).data.publicUrl, "");
  }

  return (
    <dialog ref={dialog} onClose={onClose} className="m-auto w-[min(860px,94vw)] rounded-xl border border-neutral-200 bg-white p-0 text-neutral-900 backdrop:bg-black/40" aria-labelledby="media-title">
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3">
        <h2 id="media-title" className="text-[15px] font-semibold">
          Image library
        </h2>
        <button type="button" onClick={() => dialog.current?.close()} className="rounded-md px-2 py-1 text-[13px] font-medium hover:bg-neutral-100">
          Close
        </button>
      </div>
      <div className="space-y-4 p-5">
        {demo ? (
          <p className="rounded-md bg-amber-50 px-3 py-2 text-[13px] text-amber-900">Demo mode: uploads are off. Paste an image address below.</p>
        ) : (
          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept={TYPES.join(",")}
              className="sr-only"
              id="media-upload"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void upload(f);
                e.target.value = "";
              }}
            />
            <label htmlFor="media-upload" className={`cursor-pointer rounded-md bg-neutral-900 px-3 py-2 text-[13px] font-semibold text-white hover:bg-black ${busy ? "pointer-events-none opacity-50" : ""}`}>
              Upload image
            </label>
            <span className="text-[12px] text-neutral-500">JPG, PNG, WebP, AVIF or SVG, up to 8 MB.</span>
          </div>
        )}
        {status && (
          <p role="status" className="text-[13px] text-neutral-700">
            {status}
          </p>
        )}
        {!demo && (
          <ul className="grid max-h-[46vh] grid-cols-3 gap-3 overflow-auto sm:grid-cols-4">
            {items.length === 0 && <li className="col-span-full text-[13px] text-neutral-500">No images uploaded yet.</li>}
            {items.map((m) => (
              <li key={m.name}>
                <button type="button" onClick={() => onPick(m.url, "")} className={`block w-full overflow-hidden rounded-md border text-left ${m.url === current ? "border-neutral-900 ring-2 ring-neutral-900/20" : "border-neutral-200 hover:border-neutral-400"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.url} alt="" className="aspect-[4/3] w-full bg-neutral-100 object-cover" loading="lazy" />
                  <span className="block truncate px-2 py-1 text-[11px] text-neutral-600">{m.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (url.trim()) onPick(url.trim(), "");
          }}
        >
          <label htmlFor="media-url" className="sr-only">
            Image address
          </label>
          <input id="media-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… or /images/…" className="flex-1 rounded-md border border-neutral-300 px-2.5 py-1.5 text-[14px]" />
          <button type="submit" className="rounded-md border border-neutral-300 px-3 py-1.5 text-[13px] font-semibold hover:bg-neutral-50">
            Use address
          </button>
        </form>
      </div>
    </dialog>
  );
}
