import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/articles";

type Params = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const articles = await getArticlesByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-16 border-b border-border pb-10">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Рубрика
        </div>
        <h1 className="mt-3 text-5xl font-bold md:text-6xl">{category.name}</h1>
        {category.description && (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {category.description}
          </p>
        )}
      </header>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">В этой рубрике пока нет статей.</p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} href={`/article/${a.slug}`} className="group">
              {a.coverImage && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.coverImage}
                    alt={a.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                {a.readingTime} мин
              </div>
              <h3 className="mt-3 text-xl font-bold leading-snug transition-colors group-hover:text-gold">
                {a.title}
              </h3>
              {a.excerpt && (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {a.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
