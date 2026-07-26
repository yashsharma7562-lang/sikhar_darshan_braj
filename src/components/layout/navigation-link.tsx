"use client";

import type { ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function NavigationLink({
  href,
  className,
  activeClassName,
  ...props
}: ComponentProps<typeof Link> & { activeClassName?: string }) {
  const pathname = usePathname();
  const path = typeof href === "string" ? href.split("?")[0] : "";
  const active =
    path === "/"
      ? pathname === "/"
      : Boolean(path && (pathname === path || pathname.startsWith(path + "/")));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(className, active && activeClassName)}
      {...props}
    />
  );
}
