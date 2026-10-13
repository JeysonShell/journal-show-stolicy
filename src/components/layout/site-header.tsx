"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/category/afisha", label: "Афиша" },
  { href: "/category/intervyu", label: "Интервью" },
  { href: "/category/za-kulisami", label: "За кулисами" },
  { href: "/category/gaidy", label: "Гайды" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-500 ${
        scrolled
          ? "h-12 border-border/60 bg-background/90"
          : "h-16 border-transparent bg-background/60"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={`font-display font-bold tracking-tight transition-all duration-500 ${
              scrolled ? "text-base" : "text-xl"
            }`}
          >
            Журнал <span className="text-gold">Столицы</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-gold ${
                scrolled ? "opacity-80" : "opacity-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Поиск"
          >
            <Search className="h-5 w-5" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
