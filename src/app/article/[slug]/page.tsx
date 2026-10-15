import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { ReadingProgress } from "@/components/article/reading-progress";
import { ProjectCta } from "@/components/article/project-cta";
import { ShareButtons } from "@/components/article/share-buttons";
import { RelatedArticles } from "@/components/article/related-articles";
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

      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3 text-sm font-medium">
            {article.category && (
              <Link
                href={`/category/${article.category.slug}`}
                className="text-gold hover:underline"
              >
                {article.category.name}
              </Link>
            )}
            <span className="font-normal text-muted-foreground">{article.readingTime} мин</span>
          </div>

          <h1 className="text-3xl font-medium leading-tight text-balance sm:text-4xl">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-8 md:text-xl">
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
          <div className="mb-8 aspect-[5/3] overflow-hidden rounded-xl bg-[#bdbdbd]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:text-foreground prose-blockquote:border-l-gold prose-blockquote:text-foreground prose-a:text-gold"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
        />

        {article.project && (
          <ProjectCta
            project={article.project}
            articleSlug={article.slug}
            variant={article.category?.slug === "afisha" ? "ticket" : "default"}
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
