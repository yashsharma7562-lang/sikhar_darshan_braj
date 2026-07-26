"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale: AppLocale = locale === "en" ? "hi" : "en";
  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className="text-peacock-deep hover:bg-sand inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold"
      aria-label={`Switch language to ${t("language")}`}
    >
      <Languages size={18} aria-hidden="true" />
      {t("language")}
    </button>
  );
}
