import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [articles, drafts, projects, categories] = await Promise.all([
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.article.count({ where: { status: "DRAFT" } }),
    prisma.project.count(),
    prisma.category.count(),
  ]);

  const stats = [
    { label: "Опубликовано статей", value: articles },
    { label: "Черновиков", value: drafts },
    { label: "Проектов", value: projects },
    { label: "Рубрик", value: categories },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Дашборд</h1>
      <p className="mt-2 text-muted-foreground">
        Общая сводка по редакции журнала.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {s.label}
            </div>
            <div className="mt-3 text-4xl font-bold font-display">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
