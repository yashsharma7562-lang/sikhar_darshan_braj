import { getTranslations } from "next-intl/server";
import { BrandMark } from "./brand-mark";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const groups = [
    {
      title: t("explore"),
      links: [
        [t("destinations"), "/destinations"],
        [t("temples"), "/temples"],
        [t("stays"), "/stays"],
        [t("packages"), "/packages"],
      ],
    },
    {
      title: t("help"),
      links: [
        [t("customerHelp"), "/help"],
        [t("accessibility"), "/accessibility"],
        [t("safety"), "/safety"],
      ],
    },
    {
      title: t("legal"),
      links: [
        [t("privacy"), "/privacy"],
        [t("terms"), "/terms"],
      ],
    },
  ] as const;
  return (
    <footer className="bg-charcoal border-t pb-20 text-white xl:pb-0">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-xl text-sm text-white/70">{t("line")}</p>
          <p className="text-soft-gold mt-2 text-xs font-medium">
            {t("verify")}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-soft-gold text-sm font-black">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link className="hover:text-white" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell py-4 text-xs text-white/55">
          © {new Date().getFullYear()} Shikhar Darshan Braj. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
