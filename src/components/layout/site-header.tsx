import { CircleUserRound, Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BrandMark } from "./brand-mark";
import { LocaleSwitcher } from "./locale-switcher";
import { NavigationLink } from "./navigation-link";
import { Link } from "@/i18n/navigation";

const links = [
  ["hotels", "/stays"],
  ["dharamshalas", "/dharamshalas"],
  ["cabs", "/transport"],
  ["packages", "/packages"],
  ["temples", "/temples"],
  ["routes", "/destinations"],
  ["live", "/live-darshan"],
  ["support", "/help"],
] as const;
export async function SiteHeader() {
  const t = await getTranslations("nav");
  return (
    <header className="bg-cream/95 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container-shell flex h-18 items-center justify-between gap-6">
        <BrandMark />
        <nav
          className="hidden items-center gap-1 xl:flex"
          aria-label="Primary navigation"
        >
          {links.map(([key, href]) => (
            <NavigationLink
              key={key}
              href={href}
              className="text-charcoal hover:bg-sand hover:text-primary-deep rounded-lg px-3 py-2 text-sm font-semibold"
              activeClassName="bg-sand text-primary-deep"
            >
              {t(key)}
            </NavigationLink>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-1 md:flex">
          <Link
            href="/search"
            className="hover:bg-sand grid size-11 place-items-center rounded-xl"
            aria-label="Search"
          >
            <Search size={19} />
          </Link>
          <LocaleSwitcher />
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold"
          >
            <CircleUserRound size={19} aria-hidden="true" />
            {t("login")}
          </Link>
          <Link
            href="/vendor/register"
            className="bg-peacock-deep hover:bg-peacock inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-bold text-white"
          >
            {t("vendor")}
          </Link>
        </div>
        <div className="md:hidden">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
