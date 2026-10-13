import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  getFeaturedArticle,
  getFreshArticles,
  getAllProjects,
} from "@/lib/articles";
import { NewsletterForm } from "@/components/effects/newsletter-form";

export const revalidate = 60;

export default async function HomePage() {
  const featured = await getFeaturedArticle();
  const fresh = await getFreshArticles(3, featured?.slug);
  const projects = await getAllProjects();

  if (!featured) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">Журнал пока пуст</h1>
        <p className="mt-4 text-muted-foreground">
          <Link href="/admin/articles/new" className="text-gold hover:underline">
            Создайте первую статью
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <section className="animate-fade-up">
        <Link
          href={`/article/${featured.slug}`}
          className="group grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            {featured.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {featured.category && (
                <span className="text-gold">{featured.category.name}</span>
              )}
              <span>·</span>
              <span>{featured.readingTime} мин</span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.02] text-balance md:text-5xl lg:text-6xl">
              {featured.title}
            </h1>

            {featured.excerpt && (
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
            )}

            <div className="mt-8 flex items-center gap-3 text-sm">
              <span className="font-medium">{featured.author.name}</span>
              {featured.publishedAt && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">
                    {featured.publishedAt.toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
        </Link>
      </section>

      {fresh.length > 0 && (
        <section className="mt-32">
          <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Свежее
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {fresh.map((a) => (
              <Link
                key={a.id}
                href={`/article/${a.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
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

                <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {a.category && (
                    <span className="text-gold">{a.category.name}</span>
                  )}
                  <span>·</span>
                  <span>{a.readingTime} мин</span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold leading-tight transition-colors group-hover:text-gold">
                  {a.title}
                </h3>

                {a.excerpt && (
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    {a.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-32">
          <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Проекты на сцене
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/project/${p.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-gold/40 hover:shadow-[0_0_60px_-20px_var(--gold)]"
              >
                <div
                  className="absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-50"
                  style={{ background: p.accentColor }}
                />

                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Проект
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-bold">
                    {p.name}
                  </h3>
                  {p.description && (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  )}
                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-gold">
                    Подробнее
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-32">
        <NewsletterForm />
      </section>
    </div>
  );
}
