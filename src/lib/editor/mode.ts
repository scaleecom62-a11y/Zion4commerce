import "server-only";

/**
 * Demo mode lets the editor UI run without a database, for local testing only.
 * It never saves or publishes. Enable with EDITOR_DEMO_MODE=1; never set it in production.
 */
export function editorDemoMode(): boolean {
  return process.env.EDITOR_DEMO_MODE === "1" && process.env.VERCEL_ENV !== "production";
}
