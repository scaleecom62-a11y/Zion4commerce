import { NextResponse } from "next/server";
import { userClient } from "@/lib/supabase/server";

// Google sign-in returns here with a one-time code.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (code) {
    const supabase = await userClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}/admin`);
    }
  }
  return NextResponse.redirect(`${origin}/admin/login?error=signin`);
}
