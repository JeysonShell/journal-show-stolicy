import { prisma } from "@/lib/prisma";
import { ArticleForm } from "@/components/admin/article-form";
import { createArticle } from "@/lib/actions/articles";

export default async function NewArticlePage() {
  const [categories, projects] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.project.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Новая статья</h1>
      <p className="mt-2 text-muted-foreground">
        Заполните поля и нажмите «Сохранить».
      </p>

      <div className="mt-10">
        <ArticleForm
          action={createArticle}
          categories={categories}
          projects={projects}
          submitLabel="Создать статью"
        />
      </div>
    </div>
  );
}
