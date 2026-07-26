import Image from "next/image";
import { Link } from "@/i18n/navigation";

export function BrandMark() {
  return (
    <Link
      href="/"
      className="flex min-h-14 items-center gap-2 rounded-xl"
      aria-label="Shikhar Darshan Braj home"
    >
      <span className="relative size-14 shrink-0 overflow-hidden rounded-full border border-amber-600/30 bg-[#fff9ef] shadow-sm">
        <Image
          src="/images/shikhar-darshan-logo.png"
          alt=""
          fill
          priority
          sizes="56px"
          className="object-cover"
        />
      </span>
      <span className="leading-tight">
        <strong className="block text-[15px] tracking-tight">
          Shikhar Darshan
        </strong>
        <span className="text-primary-deep block text-xs font-semibold tracking-[0.22em] uppercase">
          Braj
        </span>
      </span>
    </Link>
  );
}
