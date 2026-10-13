import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getArticlesByProject, getProjectBySlug } from "@/lib/articles";
import { buildUtmUrl } from "@/lib/utm";

type Params = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const articles = await getArticlesByProject(slug);
  const externalHref = project.externalUrl
    ? buildUtmUrl(project.externalUrl, `project-${project.slug}`)
    : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="relative mb-16 overflow-hidden rounded-3xl border border-border bg-card p-12">
        <div
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: project.accentColor }}
        />
        <div className="relative">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Проект
          </div>
          <h1 className="mt-3 text-5xl font-bold md:text-6xl">{project.name}</h1>
          {project.description && (
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              {project.description}
            </p>
          )}
          {externalHref && (
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-hover"
            >
              Перейти на сайт проекта
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </header>

      <h2 className="mb-10 text-3xl font-bold">Материалы о проекте</h2>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">Пока нет статей об этом проекте.</p>
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
              <h3 className="mt-5 text-xl font-bold leading-snug transition-colors group-hover:text-gold">
                {a.title}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
