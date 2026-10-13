import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteArticle } from "@/lib/actions/articles";

async function deleteAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (id) await deleteArticle(id);
}

export default async function ArticlesListPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true, project: true, author: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Статьи</h1>
          <p className="mt-2 text-muted-foreground">
            Всего: {articles.length}
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-ink hover:bg-gold-hover"
        >
          + Новая статья
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Заголовок</th>
              <th className="px-4 py-3">Рубрика</th>
              <th className="px-4 py-3">Проект</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3">Обновлено</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/articles/${a.id}/edit`}
                    className="font-medium hover:text-gold"
                  >
                    {a.title}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    {a.author.name || a.author.email}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {a.category?.name || "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {a.project?.name || "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      a.status === "PUBLISHED"
                        ? "rounded bg-gold/20 px-2 py-0.5 text-xs text-gold"
                        : "rounded bg-muted px-2 py-0.5 text-xs"
                    }
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {a.updatedAt.toLocaleDateString("ru-RU")}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {a.status === "PUBLISHED" && (
                      <Link
                        href={`/article/${a.slug}`}
                        target="_blank"
                        className="text-xs text-muted-foreground hover:text-gold"
                      >
                        Открыть
                      </Link>
                    )}
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={a.id} />
                      <button
                        type="submit"
                        className="text-xs text-muted-foreground hover:text-destructive"
                      >
                        Удалить
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  Пока нет ни одной статьи. Создайте первую!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
