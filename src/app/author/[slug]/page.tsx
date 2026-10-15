import { notFound } from "next/navigation";
import { getAuthorBySlug, getArticlesByAuthor } from "@/lib/articles";
import { ArticleCard } from "@/components/article/article-card";

type Params = { params: Promise<{ slug: string }> };

export default async function AuthorPage({ params }: Params) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const articles = await getArticlesByAuthor(author.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <header className="mb-6">
        <h1 className="text-3xl font-medium">{author.name || "Без имени"}</h1>
        {author.bio && (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{author.bio}</p>
        )}
        <div className="mt-2 text-sm text-muted-foreground">
          {articles.length} {articles.length === 1 ? "материал" : "материалов"}
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
