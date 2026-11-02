"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { browserClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(params.get("error") ? "Sign-in didn't complete. Try again." : "");
  const supabase = browserClient();

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return setError("The editor is not configured.");
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setError(error.message === "Invalid login credentials" ? "Wrong email or password. Use your Tasqr login." : error.message);
    router.replace("/admin");
    router.refresh();
  }

  async function google() {
    if (!supabase) return setError("The editor is not configured.");
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
    if (error) setError(error.message);
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/zion4commerce-logo.png" alt="" className="h-8 w-8" />
        <div>
          <h1 className="text-[16px] font-semibold text-neutral-900">Website editor</h1>
          <p className="text-[12px] text-neutral-500">Sign in with your Tasqr account</p>
        </div>
      </div>
      <form onSubmit={signIn} className="space-y-3">
        <div>
          <label htmlFor="email" className="mb-1 block text-[13px] font-semibold text-neutral-800">
            Email
          </label>
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-neutral-300 px-3 py-2 text-[14px]" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-[13px] font-semibold text-neutral-800">
            Password
          </label>
          <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-neutral-300 px-3 py-2 text-[14px]" />
        </div>
        {error && (
          <p role="alert" className="text-[13px] font-medium text-red-700">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy} className="w-full rounded-md bg-neutral-900 px-3 py-2 text-[14px] font-semibold text-white hover:bg-black disabled:opacity-50">
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <button type="button" onClick={google} className="mt-3 w-full rounded-md border border-neutral-300 px-3 py-2 text-[14px] font-semibold text-neutral-800 hover:bg-neutral-50">
        Continue with Google
      </button>
      <p className="mt-4 text-[12px] leading-relaxed text-neutral-500">Only people on the website editors list can open the editor, even with a valid Tasqr login.</p>
    </div>
  );
}
