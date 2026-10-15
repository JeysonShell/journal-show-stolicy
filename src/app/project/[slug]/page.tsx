import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getArticlesByProject, getProjectBySlug } from "@/lib/articles";
import { ArticleCard } from "@/components/article/article-card";
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
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <header
        className="mb-8 rounded-xl border border-border bg-card p-5 sm:p-8"
        style={{ borderTopColor: project.accentColor, borderTopWidth: 3 }}
      >
        <h1 className="text-3xl font-medium">{project.name}</h1>
        {project.description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        )}
        {externalHref && (
          <a
            href={externalHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-white hover:bg-gold-hover"
          >
            На сайт проекта
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </header>

      <h2 className="mb-4 text-2xl font-medium">Материалы</h2>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">Пока нет статей об этом проекте.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
