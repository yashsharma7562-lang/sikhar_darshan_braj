"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function LogoutButton({ locale }: { locale: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/auth/session", { method: "DELETE" });
        router.push("/" + locale + "/login");
        router.refresh();
      }}
      className="text-charcoal min-h-11 rounded-xl border bg-white px-4 text-sm font-bold disabled:opacity-60"
    >
      Sign out
    </button>
  );
}
