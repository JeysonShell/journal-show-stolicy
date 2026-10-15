"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteNav } from "@/lib/site-nav";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-card">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0 text-[15px] font-medium tracking-tight">
          Журнал <span className="text-gold">Столицы</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium text-gold ${
                  active ? "bg-black/[0.04] dark:bg-white/10" : "hover:bg-black/[0.04] dark:hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="rounded-full p-2 text-gold hover:bg-black/[0.04] dark:hover:bg-white/10"
            aria-label="Поиск"
          >
            <Search className="h-5 w-5" />
          </Link>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
