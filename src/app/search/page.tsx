import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Поиск" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q || "").trim();

  const results = query
    ? await prisma.article.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: query } },
            { excerpt: { contains: query } },
            { content: { contains: query } },
          ],
        },
        orderBy: { publishedAt: "desc" },
        take: 50,
        include: { category: true, author: true },
      })
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-medium">Поиск</h1>

      <form className="mt-8 flex gap-2" action="/search">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Найти статью..."
          autoFocus
          className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-gold"
        />
        <button
          type="submit"
          className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-white hover:bg-gold-hover"
        >
          Найти
        </button>
      </form>

      {query && (
        <div className="mt-10">
          <p className="text-sm text-muted-foreground">
            {results.length > 0
              ? `Найдено: ${results.length}`
              : "Ничего не найдено."}
          </p>

          <div className="mt-6 space-y-6">
            {results.map((a) => (
              <Link
                key={a.id}
                href={`/article/${a.slug}`}
                className="group block border-b border-border pb-6"
              >
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {a.category?.name}
                </div>
                <h2 className="mt-2 text-xl font-bold transition-colors group-hover:text-gold">
                  {a.title}
                </h2>
                {a.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {a.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
