import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Editor } from "@/components/editor/Editor";
import { DEFAULT_SITE } from "@/lib/content/default-site";
import { normaliseSite } from "@/lib/content/normalise";
import { FALLBACK_TEAM, getPublishedSite, getTeam } from "@/lib/content/store";
import { editorDemoMode } from "@/lib/editor/mode";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getEditor, userClient } from "@/lib/supabase/server";

async function EditorGate() {
  if (editorDemoMode()) {
    return <Editor initial={DEFAULT_SITE} team={FALLBACK_TEAM} demo editorName="Demo" />;
  }
  if (!supabaseConfigured) {
    return <p className="p-8 font-sans text-[15px]">The editor is not configured: add the Supabase URL and publishable key to the environment.</p>;
  }
  const editor = await getEditor();
  if (!editor) redirect("/admin/login");

  const supabase = await userClient();
  const { data: draft } = (await supabase?.from("site_documents").select("content").eq("key", "draft").maybeSingle()) ?? { data: null };
  const initial = draft?.content ? normaliseSite(draft.content) : await getPublishedSite();
  const team = await getTeam();
  return <Editor initial={initial} team={team} demo={false} editorName={editor.name} />;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="p-8 font-sans text-[15px] text-neutral-600">Opening the editor…</p>}>
      <EditorGate />
    </Suspense>
  );
}
