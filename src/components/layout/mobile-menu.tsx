"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteNav } from "@/lib/site-nav";

const nav = [...siteNav, { href: "/search", label: "Поиск" }];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Меню"
        onClick={() => setOpen(true)}
        className="rounded-full p-2 text-gold hover:bg-black/[0.04] md:hidden dark:hover:bg-white/10"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full flex-col bg-background p-4">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium">
                Журнал <span className="text-gold">Столицы</span>
              </span>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-12 space-y-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-full px-3 py-3 text-lg font-medium text-gold hover:bg-black/[0.04]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-3 text-xs text-muted-foreground">
              show-stolicy.ru
            </div>
          </div>
        </div>
      )}
    </>
  );
}
