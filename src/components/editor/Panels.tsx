"use client";

import { useEffect, useState } from "react";
import { listLeads, listTeam, listVersions, loadVersion, saveTeamMember, type LeadRow, type TeamAdminRow, type VersionRow } from "@/app/admin/actions";
import type { SiteContent } from "@/lib/content/schema";

const h2 = "text-[18px] font-semibold text-neutral-900";
const cell = "px-3 py-2 align-top text-[13px]";
const input = "w-full rounded-md border border-neutral-300 bg-white px-2 py-1 text-[13px]";

function when(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
}

function Notice({ children }: { children: React.ReactNode }) {
  return <p className="rounded-md bg-amber-50 px-3 py-2 text-[13px] text-amber-900">{children}</p>;
}

export function TeamPanel({ demo, notify }: { demo: boolean; notify: (t: string, tone?: "ok" | "error") => void }) {
  const [rows, setRows] = useState<TeamAdminRow[] | null>(null);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (demo) return;
    void listTeam().then((r) => (r.ok ? setRows(r.data ?? []) : setError(r.error)));
  }, [demo]);

  function patch(id: string, p: Partial<TeamAdminRow>) {
    setRows((rs) => rs?.map((r) => (r.id === id ? { ...r, ...p } : r)) ?? rs);
  }

  async function save(r: TeamAdminRow) {
    setSavingId(r.id);
    const res = await saveTeamMember({ id: r.id, show: r.show_on_website, order: r.website_order, role: r.website_role ?? "", bio: r.website_bio ?? "", linkedin: r.linkedin_url ?? "" });
    setSavingId(null);
    notify(res.ok ? `${r.name} saved. The team page updates right away.` : res.error, res.ok ? "ok" : "error");
  }

  return (
    <section className="space-y-4" aria-labelledby="team-h">
      <h2 id="team-h" className={h2}>
        Team on the website
      </h2>
      <p className="text-[13px] text-neutral-600">Only people switched on here appear on the website, and only their name, title, photo, bio and LinkedIn. Names and photos are edited in Tasqr. These changes go live as soon as you save each person.</p>
      {demo && <Notice>Demo mode: connect the database to manage the team.</Notice>}
      {error && <Notice>{error}</Notice>}
      {rows && (
        <ul className="space-y-2">
          {rows.map((r) => (
            <li key={r.id} className={`rounded-lg border bg-white p-3 ${r.is_active ? "border-neutral-200" : "border-neutral-200 opacity-60"}`}>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-[13px] font-semibold text-neutral-700">
                  {r.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.photo} alt="" className="h-full w-full object-cover" />
                  ) : (
                    r.name
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                  )}
                </div>
                <div className="min-w-[10rem] flex-1">
                  <p className="text-[14px] font-semibold">{r.name}</p>
                  <p className="text-[12px] text-neutral-500">
                    {r.designation ?? "No title in Tasqr"}
                    {!r.is_active && " · inactive in Tasqr, never shown"}
                  </p>
                </div>
                <label className="flex items-center gap-2 text-[13px] font-medium">
                  <input type="checkbox" className="h-4 w-4 accent-neutral-900" checked={r.show_on_website} disabled={!r.is_active} onChange={(e) => patch(r.id, { show_on_website: e.target.checked })} />
                  Show on website
                </label>
                <label className="flex items-center gap-2 text-[13px]">
                  Order
                  <input type="number" className={`${input} w-20`} value={r.website_order} onChange={(e) => patch(r.id, { website_order: e.target.valueAsNumber || 0 })} />
                </label>
                <button type="button" onClick={() => void save(r)} disabled={savingId === r.id} className="rounded-md bg-neutral-900 px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-black disabled:opacity-50">
                  {savingId === r.id ? "Saving…" : "Save"}
                </button>
              </div>
              {r.show_on_website && (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="text-[12px] font-medium text-neutral-700">
                    Title on the website (leave blank to use Tasqr&apos;s)
                    <input className={`${input} mt-1`} value={r.website_role ?? ""} placeholder={r.designation ?? ""} onChange={(e) => patch(r.id, { website_role: e.target.value })} />
                  </label>
                  <label className="text-[12px] font-medium text-neutral-700">
                    LinkedIn address
                    <input className={`${input} mt-1`} value={r.linkedin_url ?? ""} placeholder="https://www.linkedin.com/in/…" onChange={(e) => patch(r.id, { linkedin_url: e.target.value })} />
                  </label>
                  <label className="text-[12px] font-medium text-neutral-700 sm:col-span-2">
                    Short bio (optional)
                    <textarea rows={2} className={`${input} mt-1`} value={r.website_bio ?? ""} onChange={(e) => patch(r.id, { website_bio: e.target.value })} />
                  </label>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function LeadsPanel({ demo }: { demo: boolean }) {
  const [rows, setRows] = useState<LeadRow[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (demo) return;
    void listLeads().then((r) => (r.ok ? setRows(r.data ?? []) : setError(r.error)));
  }, [demo]);

  function exportCsv() {
    if (!rows?.length) return;
    const cols: (keyof LeadRow)[] = ["created_at", "name", "email", "company", "website", "phone", "country", "spend", "services", "message"];
    const esc = (v: unknown) => `"${String(Array.isArray(v) ? v.join("; ") : (v ?? "")).replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `audit-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <section className="space-y-4" aria-labelledby="leads-h">
      <div className="flex items-center justify-between">
        <h2 id="leads-h" className={h2}>
          Audit requests {rows ? <span className="text-neutral-500">({rows.length})</span> : null}
        </h2>
        <button type="button" onClick={exportCsv} disabled={!rows?.length} className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-[13px] font-semibold hover:bg-neutral-50 disabled:opacity-40">
          Download CSV
        </button>
      </div>
      {demo && <Notice>Demo mode: connect the database to see audit requests.</Notice>}
      {error && <Notice>{error}</Notice>}
      {rows && rows.length === 0 && <p className="text-[13px] text-neutral-600">No requests yet.</p>}
      {rows && rows.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-neutral-50 text-left text-[12px] text-neutral-600">
              <tr>
                <th className={cell}>Received</th>
                <th className={cell}>Who</th>
                <th className={cell}>Brand</th>
                <th className={cell}>Ad spend</th>
                <th className={cell}>Interested in</th>
                <th className={cell}>Message</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-neutral-100">
                  <td className={`${cell} whitespace-nowrap text-neutral-600`}>{when(r.created_at)}</td>
                  <td className={cell}>
                    <p className="font-semibold">{r.name}</p>
                    <a className="text-blue-700 underline" href={`mailto:${r.email}`}>
                      {r.email}
                    </a>
                    {r.phone && <p className="text-neutral-600">{r.phone}</p>}
                  </td>
                  <td className={cell}>
                    {r.company ?? "—"}
                    {r.website && <p className="max-w-[14rem] truncate text-neutral-600">{r.website}</p>}
                    {r.country && <p className="text-neutral-600">{r.country}</p>}
                  </td>
                  <td className={cell}>{r.spend ?? "—"}</td>
                  <td className={cell}>{r.services.length ? r.services.join(", ") : "—"}</td>
                  <td className={`${cell} max-w-[22rem] whitespace-pre-wrap`}>{r.message ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export function HistoryPanel({ demo, onLoad }: { demo: boolean; onLoad: (c: SiteContent) => void }) {
  const [rows, setRows] = useState<VersionRow[] | null>(null);
  const [error, setError] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  useEffect(() => {
    if (demo) return;
    void listVersions().then((r) => (r.ok ? setRows(r.data ?? []) : setError(r.error)));
  }, [demo]);

  return (
    <section className="space-y-4" aria-labelledby="hist-h">
      <h2 id="hist-h" className={h2}>
        Published versions
      </h2>
      {demo && <Notice>Demo mode: connect the database to see history.</Notice>}
      {error && <Notice>{error}</Notice>}
      {rows && rows.length === 0 && <p className="text-[13px] text-neutral-600">Nothing published from the editor yet.</p>}
      {rows && rows.length > 0 && (
        <ol className="divide-y divide-neutral-100 rounded-lg border border-neutral-200 bg-white">
          {rows.map((v, i) => (
            <li key={v.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="text-[14px] font-medium">
                  {when(v.created_at)} {i === 0 && <span className="ml-1 rounded bg-green-100 px-1.5 py-0.5 text-[11px] font-semibold text-green-800">Live</span>}
                </p>
                <p className="text-[12px] text-neutral-600">
                  {v.author ?? "Unknown"}
                  {v.note ? ` · ${v.note}` : ""}
                </p>
              </div>
              <button
                type="button"
                disabled={loadingId === v.id}
                onClick={async () => {
                  if (!confirm("Replace your current draft with this version? You can undo afterwards.")) return;
                  setLoadingId(v.id);
                  const r = await loadVersion(v.id);
                  setLoadingId(null);
                  if (r.ok && r.data) onLoad(r.data);
                  else if (!r.ok) setError(r.error);
                }}
                className="rounded-md border border-neutral-300 px-3 py-1.5 text-[13px] font-semibold hover:bg-neutral-50 disabled:opacity-40"
              >
                {loadingId === v.id ? "Loading…" : "Load into editor"}
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
