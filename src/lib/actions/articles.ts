"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";
import slugify from "slugify";

function calcReadingTime(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function requireAuth() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) redirect("/login");
  return user;
}

function makeSlug(title: string) {
  return slugify(title, { lower: true, strict: true, locale: "ru" });
}

export async function createArticle(formData: FormData) {
  const user = await requireAuth();

  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Заголовок обязателен");

  const content = sanitizeHtml(String(formData.get("content") || ""));
  const excerpt = String(formData.get("excerpt") || "").trim() || null;
  const coverImage = String(formData.get("coverImage") || "").trim() || null;
  const status = String(formData.get("status") || "DRAFT") as any;
  const categoryId = String(formData.get("categoryId") || "") || null;
  const projectId = String(formData.get("projectId") || "") || null;
  const seoTitle = String(formData.get("seoTitle") || "").trim() || null;
  const seoDesc = String(formData.get("seoDesc") || "").trim() || null;
  const publishedAtRaw = String(formData.get("publishedAt") || "");

  const baseSlug = makeSlug(title);
  let slug = baseSlug;
  let i = 1;
  while (await prisma.article.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${i++}`;
  }

  const publishedAt =
    status === "PUBLISHED"
      ? publishedAtRaw
        ? new Date(publishedAtRaw)
        : new Date()
      : null;

  await prisma.article.create({
    data: {
      slug,
      title,
      excerpt,
      content,
      coverImage,
      status,
      publishedAt,
      readingTime: calcReadingTime(content),
      seoTitle,
      seoDesc,
      authorId: user.id,
      categoryId,
      projectId,
    },
  });

  revalidatePath("/admin/articles");
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAuth();

  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Заголовок обязателен");

  const content = sanitizeHtml(String(formData.get("content") || ""));
  const excerpt = String(formData.get("excerpt") || "").trim() || null;
  const coverImage = String(formData.get("coverImage") || "").trim() || null;
  const status = String(formData.get("status") || "DRAFT") as any;
  const categoryId = String(formData.get("categoryId") || "") || null;
  const projectId = String(formData.get("projectId") || "") || null;
  const seoTitle = String(formData.get("seoTitle") || "").trim() || null;
  const seoDesc = String(formData.get("seoDesc") || "").trim() || null;
  const publishedAtRaw = String(formData.get("publishedAt") || "");

  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) throw new Error("Статья не найдена");

  const publishedAt =
    status === "PUBLISHED"
      ? publishedAtRaw
        ? new Date(publishedAtRaw)
        : existing.publishedAt || new Date()
      : null;

  await prisma.article.update({
    where: { id },
    data: {
      title,
      excerpt,
      content,
      coverImage,
      status,
      publishedAt,
      readingTime: calcReadingTime(content),
      seoTitle,
      seoDesc,
      categoryId,
      projectId,
    },
  });

  revalidatePath("/admin/articles");
  revalidatePath("/");
  revalidatePath(`/article/${existing.slug}`);
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  await requireAuth();
  const a = await prisma.article.findUnique({ where: { id } });
  if (!a) return;
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
  revalidatePath("/");
}
