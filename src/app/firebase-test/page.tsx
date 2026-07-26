"use client";

import { useEffect, useState } from "react";
import {
  getFirebaseClientAnalytics,
  getFirebaseClientAuth,
} from "@/infrastructure/firebase/client";

type CheckStatus = "checking" | "ready" | "unavailable" | "error";

type FirebaseChecks = {
  app: CheckStatus;
  auth: CheckStatus;
  analytics: CheckStatus;
  message: string;
};

const statusStyles: Record<CheckStatus, string> = {
  checking: "bg-amber-100 text-amber-900",
  ready: "bg-emerald-100 text-emerald-900",
  unavailable: "bg-slate-200 text-slate-700",
  error: "bg-red-100 text-red-900",
};

export default function FirebaseTestPage() {
  const [checks, setChecks] = useState<FirebaseChecks>({
    app: "checking",
    auth: "checking",
    analytics: "checking",
    message: "Connecting to Firebase�",
  });

  useEffect(() => {
    let active = true;

    async function checkFirebase() {
      try {
        const auth = getFirebaseClientAuth();
        if (!auth) {
          if (active) {
            setChecks({
              app: "unavailable",
              auth: "unavailable",
              analytics: "unavailable",
              message: "Firebase environment variables are missing.",
            });
          }
          return;
        }

        const analytics = await getFirebaseClientAnalytics();
        if (active) {
          setChecks({
            app: "ready",
            auth: "ready",
            analytics: analytics ? "ready" : "unavailable",
            message: analytics
              ? "Firebase initialized successfully."
              : "Firebase initialized; Analytics is unsupported in this browser.",
          });
        }
      } catch (error) {
        if (active) {
          setChecks({
            app: "error",
            auth: "error",
            analytics: "error",
            message:
              error instanceof Error ? error.message : "Firebase check failed.",
          });
        }
      }
    }

    void checkFirebase();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-16 text-slate-950">
      <section className="mx-auto max-w-2xl rounded-3xl border border-orange-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold tracking-widest text-orange-700 uppercase">
          Shikhar Darshan Braj
        </p>
        <h1 className="mt-3 text-3xl font-bold">Firebase diagnostics</h1>
        <p className="mt-3 text-slate-600" aria-live="polite">
          {checks.message}
        </p>

        <dl className="mt-8 grid gap-4">
          {(
            [
              ["Firebase app", checks.app],
              ["Authentication", checks.auth],
              ["Analytics", checks.analytics],
            ] as const
          ).map(([label, status]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
            >
              <dt className="font-medium">{label}</dt>
              <dd
                className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[status]}`}
              >
                {status}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-sm text-slate-500">
          Project: shikhar-darshan-braj
        </p>
      </section>
    </main>
  );
}
