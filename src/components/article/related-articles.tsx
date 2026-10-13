import Link from "next/link";

type Article = {
  slug: string;
  title: string;
  coverImage: string | null;
  readingTime: number;
  category: { name: string } | null;
};

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-24 border-t border-border pt-16">
      <h2 className="mb-10 font-display text-3xl font-bold md:text-4xl">
        Читайте также
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/article/${a.slug}`}
            className="group flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              {a.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={a.coverImage}
                  alt={a.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {a.category && <span className="text-gold">{a.category.name}</span>}
              <span>·</span>
              <span>{a.readingTime} мин</span>
            </div>

            <h3 className="mt-3 font-display text-xl font-bold leading-snug transition-colors group-hover:text-gold">
              {a.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
