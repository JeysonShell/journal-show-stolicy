import Link from "next/link";
import {
  getFeaturedArticle,
  getFreshArticles,
  getAllProjects,
} from "@/lib/articles";
import { ArticleCard } from "@/components/article/article-card";
import { NewsletterForm } from "@/components/effects/newsletter-form";

export const revalidate = 60;

export default async function HomePage() {
  const featured = await getFeaturedArticle();
  const fresh = await getFreshArticles(3, featured?.slug);
  const projects = await getAllProjects();

  if (!featured) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-medium">Журнал пока пуст</h1>
        <p className="mt-3 text-muted-foreground">
          <Link href="/admin/articles/new" className="text-gold hover:underline">
            Создайте первую статью
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <section>
        <Link
          href={`/article/${featured.slug}`}
          className="group grid overflow-hidden rounded-xl border border-border bg-card lg:grid-cols-2"
        >
          <div className="relative aspect-[5/3] overflow-hidden bg-[#bdbdbd]">
            {featured.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div className="flex flex-col justify-center p-5 sm:p-8">
            <div className="flex items-center gap-3 text-sm font-medium text-gold">
              {featured.category && <span>{featured.category.name}</span>}
              <span className="text-muted-foreground">{featured.readingTime} мин</span>
            </div>

            <h1 className="mt-3 text-3xl font-medium leading-tight text-balance sm:text-4xl">
              {featured.title}
            </h1>

            {featured.excerpt && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
            )}

            <div className="mt-6 text-sm text-muted-foreground">
              <span className="text-foreground">{featured.author.name}</span>
              {featured.publishedAt && (
                <span>
                  {" · "}
                  {featured.publishedAt.toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              )}
            </div>
          </div>
        </Link>
      </section>

      {fresh.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-medium">Свежее</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fresh.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-medium">Проекты</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/project/${p.slug}`}
                className="rounded-xl border border-border bg-card p-5"
                style={{ borderTopColor: p.accentColor, borderTopWidth: 3 }}
              >
                <h3 className="text-xl font-medium">{p.name}</h3>
                {p.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                )}
                <div className="mt-4 text-sm font-medium text-gold">Открыть</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <NewsletterForm />
      </section>
    </div>
  );
}
