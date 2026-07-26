import { MapPinned } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("common");
  return (
    <div className="container-shell grid min-h-[60vh] place-items-center py-20">
      <div className="max-w-lg text-center">
        <MapPinned
          className="text-primary mx-auto"
          size={52}
          aria-hidden="true"
        />
        <p className="text-primary-deep mt-5 font-bold">404</p>
        <h1 className="mt-2 text-3xl font-extrabold">{t("notFoundTitle")}</h1>
        <p className="text-muted mt-3">{t("notFoundText")}</p>
        <Link
          href="/"
          className="bg-peacock-deep mt-7 inline-flex min-h-12 items-center rounded-xl px-6 font-bold text-white"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
