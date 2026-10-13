import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { ReadingProgress } from "@/components/article/reading-progress";
import { ProjectCta } from "@/components/article/project-cta";
import { ShareButtons } from "@/components/article/share-buttons";
import { RelatedArticles } from "@/components/article/related-articles";
import { InterviewView } from "@/components/article/formats/interview-view";
import { AfishaView } from "@/components/article/formats/afisha-view";
import { BackstageView } from "@/components/article/formats/backstage-view";
import { sanitizeHtml } from "@/lib/sanitize";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { userSlug } from "@/lib/slug-user";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Статья не найдена" };
  return {
    title: article.seoTitle || article.title,
    description: article.seoDesc || article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      images: article.coverImage ? [article.coverImage] : undefined,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
    },
  };
}

function renderByCategory(
  categorySlug: string | undefined,
  content: string,
  subtitle: string | null,
  authorName: string
) {
  const safe = sanitizeHtml(content);

  if (categorySlug === "intervyu") {
    return <InterviewView content={safe} author={authorName} subtitle={subtitle} />;
  }
  if (categorySlug === "afisha") {
    return <AfishaView content={safe} />;
  }
  if (categorySlug === "za-kulisami") {
    return <BackstageView content={safe} />;
  }

  return (
    <div
      className="prose prose-lg prose-invert max-w-none prose-headings:font-display prose-headings:text-foreground prose-blockquote:border-l-gold prose-blockquote:font-display prose-blockquote:text-2xl prose-blockquote:not-italic prose-blockquote:text-foreground prose-a:text-gold"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.status !== "PUBLISHED") notFound();

  await prisma.article.update({
    where: { id: article.id },
    data: { views: { increment: 1 } },
  }).catch(() => {});

  const related = await getRelatedArticles(article.id, article.categoryId, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const shareUrl = `${siteUrl}/article/${article.slug}`;
  const categorySlug = article.category?.slug;
  const authorSlug = article.author.slug || userSlug(article.author.name || "", article.author.email);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt || undefined,
    image: article.coverImage || undefined,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: { "@type": "Person", name: article.author.name || "Редакция" },
    publisher: {
      "@type": "Organization",
      name: "Журнал Шоу Столицы",
      url: siteUrl,
    },
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-12">
          <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {article.category && (
              <Link
                href={`/category/${article.category.slug}`}
                className="text-gold hover:underline"
              >
                {article.category.name}
              </Link>
            )}
            <span>·</span>
            <span>{article.readingTime} мин чтения</span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] text-balance md:text-6xl lg:text-7xl">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-3 text-sm">
              <Link
                href={`/author/${authorSlug}`}
                className="font-medium transition-colors hover:text-gold"
              >
                {article.author.name}
              </Link>
              {article.publishedAt && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">
                    {article.publishedAt.toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
            <ShareButtons title={article.title} url={shareUrl} />
          </div>
        </header>

        {article.coverImage && (
          <div className="mb-14 -mx-6 aspect-[16/9] overflow-hidden rounded-3xl md:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {renderByCategory(
          categorySlug,
          article.content,
          article.excerpt,
          article.author.name || ""
        )}

        {article.project && (
          <ProjectCta
            project={article.project}
            articleSlug={article.slug}
            variant={categorySlug === "afisha" ? "ticket" : "default"}
          />
        )}

        <div className="mt-16 border-t border-border pt-8">
          <ShareButtons title={article.title} url={shareUrl} />
        </div>

        <RelatedArticles articles={related} />
      </article>
    </>
  );
}
