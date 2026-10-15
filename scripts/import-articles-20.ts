import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Row = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "afisha" | "intervyu" | "za-kulisami";
  projectSlug: string;
  coverImage: string;
  seoTitle: string;
  seoDesc: string;
};

function readingTime(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function main() {
  const rows: Row[] = JSON.parse(
    readFileSync(new URL("./articles-20.json", import.meta.url), "utf8")
  );

  const [categories, project, anna, igor, maria] = await Promise.all([
    prisma.category.findMany(),
    prisma.project.findUnique({ where: { slug: "shou-stolicy" } }),
    prisma.user.findUnique({ where: { email: "anna@show-stolicy.ru" } }),
    prisma.user.findUnique({ where: { email: "igor@show-stolicy.ru" } }),
    prisma.user.findUnique({ where: { email: "maria@show-stolicy.ru" } }),
  ]);

  if (!project || !anna || !igor || !maria) {
    throw new Error("В базе нет проекта или авторов. Сначала выполните db:seed.");
  }

  const categoryId = Object.fromEntries(categories.map((c) => [c.slug, c.id]));
  const authorByCategory = {
    afisha: igor.id,
    intervyu: anna.id,
    "za-kulisami": maria.id,
  };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const data = {
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      coverImage: row.coverImage,
      status: "PUBLISHED" as const,
      publishedAt: new Date(Date.UTC(2026, 9, 15 - Math.floor(i / 2), 8, 0, 0)),
      readingTime: readingTime(row.content),
      seoTitle: row.seoTitle,
      seoDesc: row.seoDesc,
      authorId: authorByCategory[row.category],
      categoryId: categoryId[row.category],
      projectId: project.id,
    };

    await prisma.article.upsert({
      where: { slug: row.slug },
      update: data,
      create: { slug: row.slug, ...data },
    });
    console.log("ok", row.slug);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
