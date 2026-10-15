import Link from "next/link";
import { siteNav } from "@/lib/site-nav";

const CURRENT_YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-lg font-medium">
            Журнал <span className="text-gold">Столицы</span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Издание о концертах, спектаклях и людях сцены. Материалы ведут на
            карточки событий show-stolicy.ru.
          </p>
        </div>

        <div>
          <div className="mb-3 text-sm font-medium">Рубрики</div>
          <ul className="space-y-2 text-sm">
            {siteNav.filter((item) => item.href !== "/").map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 text-sm font-medium">Издание</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="text-muted-foreground hover:text-gold">О журнале</Link></li>
            <li><Link href="/contacts" className="text-muted-foreground hover:text-gold">Контакты</Link></li>
            <li><Link href="/search" className="text-muted-foreground hover:text-gold">Поиск</Link></li>
            <li><Link href="/rss.xml" className="text-muted-foreground hover:text-gold">RSS</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {CURRENT_YEAR} Шоу Столицы
      </div>
    </footer>
  );
}
