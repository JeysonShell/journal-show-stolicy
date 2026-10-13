import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCategory } from "@/lib/actions/categories";

async function deleteAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (id) await deleteCategory(id);
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { articles: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Рубрики</h1>
          <p className="mt-2 text-muted-foreground">
            От рубрики зависит формат отображения статьи.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-ink hover:bg-gold-hover"
        >
          + Новая рубрика
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {categories.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              /{c.slug}
            </div>
            <h3 className="mt-2 text-xl font-bold">{c.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {c.description || "—"}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="text-gold">{c._count.articles} статей</span>
              <Link
                href={`/admin/categories/${c.id}/edit`}
                className="text-muted-foreground hover:text-gold"
              >
                Редактировать
              </Link>
              <form action={deleteAction}>
                <input type="hidden" name="id" value={c.id} />
                <button
                  type="submit"
                  className="text-muted-foreground hover:text-destructive"
                >
                  Удалить
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
