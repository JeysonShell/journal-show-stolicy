import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArticleForm } from "@/components/admin/article-form";
import { updateArticle } from "@/lib/actions/articles";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [article, categories, projects] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.project.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!article) notFound();

  const action = updateArticle.bind(null, article.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Редактирование</h1>
      <p className="mt-2 text-muted-foreground">{article.title}</p>

      <div className="mt-10">
        <ArticleForm
          action={action}
          categories={categories}
          projects={projects}
          initial={{
            id: article.id,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            coverImage: article.coverImage,
            status: article.status,
            categoryId: article.categoryId,
            projectId: article.projectId,
            seoTitle: article.seoTitle,
            seoDesc: article.seoDesc,
            publishedAt: article.publishedAt,
          }}
          submitLabel="Сохранить изменения"
        />
      </div>
    </div>
  );
}
