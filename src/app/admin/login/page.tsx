import { Suspense } from "react";
import { LoginForm } from "@/components/editor/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-neutral-100 p-4 font-sans">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
