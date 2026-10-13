import Link from "next/link";

const CURRENT_YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border/60 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-transparent via-gold/[0.03] to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-3xl font-bold font-display">
            Журнал <span className="text-gold">Столицы</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Издание о концертах, спектаклях и людях сцены. Мы бываем за
            кулисами, разговариваем с артистами и показываем то, что
            остаётся за пределами афиш.
          </p>
          <div className="mt-6 flex gap-3 text-xs uppercase tracking-widest text-gold">
            <span>— Сцена</span>
            <span>— Свет</span>
            <span>— Звук</span>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Рубрики
          </div>
          <ul className="space-y-3 text-sm">
            <li><Link href="/category/afisha" className="text-muted-foreground transition-colors hover:text-gold">Афиша</Link></li>
            <li><Link href="/category/intervyu" className="text-muted-foreground transition-colors hover:text-gold">Интервью</Link></li>
            <li><Link href="/category/za-kulisami" className="text-muted-foreground transition-colors hover:text-gold">За кулисами</Link></li>
            <li><Link href="/category/gaidy" className="text-muted-foreground transition-colors hover:text-gold">Гайды</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Издание
          </div>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="text-muted-foreground transition-colors hover:text-gold">О журнале</Link></li>
            <li><Link href="/contacts" className="text-muted-foreground transition-colors hover:text-gold">Контакты</Link></li>
            <li><Link href="/search" className="text-muted-foreground transition-colors hover:text-gold">Поиск</Link></li>
            <li><Link href="/rss.xml" className="text-muted-foreground transition-colors hover:text-gold">RSS</Link></li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {CURRENT_YEAR} Шоу Столицы. Все права защищены.
      </div>
    </footer>
  );
}
