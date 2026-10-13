import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [articles, categories, projects] = await Promise.all([
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
    prisma.category.findMany({ select: { slug: true } }),
    prisma.project.findMany({ select: { slug: true } }),
  ]);

  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/search`, priority: 0.3 },
    { url: `${siteUrl}/about`, priority: 0.5 },
    { url: `${siteUrl}/contacts`, priority: 0.5 },
    ...articles.map((a) => ({
      url: `${siteUrl}/article/${a.slug}`,
      lastModified: a.updatedAt,
      priority: 0.8,
    })),
    ...categories.map((c) => ({
      url: `${siteUrl}/category/${c.slug}`,
      priority: 0.6,
    })),
    ...projects.map((p) => ({
      url: `${siteUrl}/project/${p.slug}`,
      priority: 0.6,
    })),
  ];
}
