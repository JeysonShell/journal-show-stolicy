import { notFound } from "next/navigation";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/articles";
import { ArticleCard } from "@/components/article/article-card";

type Params = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const articles = await getArticlesByCategory(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <header className="mb-6">
        <h1 className="text-3xl font-medium">{category.name}</h1>
        {category.description && (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {category.description}
          </p>
        )}
      </header>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">В этой рубрике пока нет статей.</p>
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
