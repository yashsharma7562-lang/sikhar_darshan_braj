"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");
  useEffect(() => {
    console.error("Page render failed", {
      name: error.name,
      digest: error.digest,
    });
  }, [error]);
  return (
    <div className="container-shell grid min-h-[60vh] place-items-center py-20">
      <div className="max-w-lg text-center">
        <AlertTriangle
          className="text-error mx-auto"
          size={48}
          aria-hidden="true"
        />
        <h1 className="mt-5 text-3xl font-extrabold">{t("errorTitle")}</h1>
        <p className="text-muted mt-3">{t("errorText")}</p>
        <button
          type="button"
          onClick={reset}
          className="bg-peacock-deep mt-7 min-h-12 rounded-xl px-6 font-bold text-white"
        >
          {t("retry")}
        </button>
      </div>
    </div>
  );
}
