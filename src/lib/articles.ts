import { prisma } from "./prisma";

export async function getFeaturedArticle() {
  return prisma.article.findFirst({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true, project: true },
  });
}

export async function getFreshArticles(limit = 3, excludeSlug?: string) {
  return prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      ...(excludeSlug && { slug: { not: excludeSlug } }),
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: { author: true, category: true, project: true },
  });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    include: { author: true, category: true, project: true },
  });
}

export async function getRelatedArticles(articleId: string, categoryId: string | null, limit = 3) {
  const where: any = {
    status: "PUBLISHED",
    id: { not: articleId },
  };
  if (categoryId) where.categoryId = categoryId;

  const related = await prisma.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: { author: true, category: true },
  });

  if (related.length >= limit) return related;

  return prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: articleId, notIn: related.map((r) => r.id) },
    },
    orderBy: { publishedAt: "desc" },
    take: limit - related.length,
    include: { author: true, category: true },
  }).then((more) => [...related, ...more]);
}

export async function getArticlesByCategory(categorySlug: string) {
  return prisma.article.findMany({
    where: { status: "PUBLISHED", category: { slug: categorySlug } },
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true, project: true },
  });
}

export async function getArticlesByProject(projectSlug: string) {
  return prisma.article.findMany({
    where: { status: "PUBLISHED", project: { slug: projectSlug } },
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true, project: true },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getAllProjects() {
  return prisma.project.findMany({ orderBy: { name: "asc" } });
}

export async function getAuthorBySlug(slug: string) {
  return prisma.user.findUnique({ where: { slug } });
}

export async function getArticlesByAuthor(authorId: string) {
  return prisma.article.findMany({
    where: { status: "PUBLISHED", authorId },
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true, project: true },
  });
}
