import { notFound } from "next/navigation";
import Link from "next/link";
import { getAuthorBySlug, getArticlesByAuthor } from "@/lib/articles";
import { userSlug } from "@/lib/slug-user";

type Params = { params: Promise<{ slug: string }> };

export default async function AuthorPage({ params }: Params) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const articles = await getArticlesByAuthor(author.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-16 border-b border-border pb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-gold">
          Автор
        </div>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-6xl">
          {author.name || "Без имени"}
        </h1>
        {author.bio && (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {author.bio}
          </p>
        )}
        <div className="mt-6 text-sm text-muted-foreground">
          {articles.length} {articles.length === 1 ? "материал" : "материалов"}
        </div>
      </header>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Link key={a.id} href={`/article/${a.slug}`} className="group">
            {a.coverImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.coverImage}
                  alt={a.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            )}
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
    </div>
  );
}
