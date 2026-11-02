"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { NavItem } from "@/lib/content/schema";

/** Phone menu. Works without script (<details>); with script it closes after a choice or a route change. */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);
  const close = () => {
    if (ref.current) ref.current.open = false;
  };
  return (
    <details ref={ref} className="site-menu">
      <summary>Menu</summary>
      <ul>
        {items.map((n) => (
          <li key={n.href + n.label}>
            {n.href.startsWith("/") ? (
              <Link href={n.href} onClick={close}>
                {n.label}
              </Link>
            ) : (
              <a href={n.href} onClick={close}>
                {n.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}
