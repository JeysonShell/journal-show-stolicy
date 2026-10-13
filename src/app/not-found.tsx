import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <div className="text-gold font-display text-7xl font-bold">404</div>
      <h1 className="mt-6 text-3xl font-bold">Страница не найдена</h1>
      <p className="mt-3 text-muted-foreground">
        Возможно, материал был перемещён или удалён.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-gold px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-hover"
      >
        На главную
      </Link>
    </div>
  );
}
