import { BedDouble, House, Landmark, Map, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { NavigationLink } from "./navigation-link";

const items = [
  ["home", "/", House],
  ["hotels", "/stays", BedDouble],
  ["temples", "/temples", Landmark],
  ["routes", "/destinations", Map],
  ["support", "/help", MessageCircle],
] as const;
export async function MobileNavigation() {
  const t = await getTranslations("nav");
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur xl:hidden"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5">
        {items.map(([key, href, Icon]) => (
          <NavigationLink
            key={key}
            href={href}
            className="text-muted hover:text-primary-deep flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold"
            activeClassName="bg-sand text-primary-deep"
          >
            <Icon size={20} aria-hidden="true" />
            <span>{t(key)}</span>
          </NavigationLink>
        ))}
      </div>
    </nav>
  );
}
