import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/lib/actions/projects";

async function deleteAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (id) await deleteProject(id);
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { articles: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Проекты</h1>
          <p className="mt-2 text-muted-foreground">
            Статьи привязываются к проектам. CTA-блок ведёт на сайт проекта с UTM.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-ink hover:bg-gold-hover"
        >
          + Новый проект
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6"
          >
            <div
              className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-20 blur-3xl"
              style={{ background: p.accentColor }}
            />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {p._count.articles} статей
              </div>
              <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
              {p.description && (
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              )}
              {p.externalUrl && (
                <a
                  href={p.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs text-gold hover:underline"
                >
                  {p.externalUrl} →
                </a>
              )}

              <div className="mt-4 flex gap-3 text-xs">
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="text-muted-foreground hover:text-gold"
                >
                  Редактировать
                </Link>
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
