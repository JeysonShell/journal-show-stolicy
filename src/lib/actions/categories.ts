"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect("/login");
}

function makeSlug(name: string) {
  return slugify(name, { lower: true, strict: true, locale: "ru" });
}

export async function createCategory(formData: FormData) {
  await requireAuth();
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Название обязательно");

  const baseSlug = makeSlug(name);
  let slug = baseSlug;
  let i = 1;
  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${i++}`;
  }

  await prisma.category.create({
    data: {
      slug,
      name,
      description: String(formData.get("description") || "").trim() || null,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  await requireAuth();
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Название обязательно");

  await prisma.category.update({
    where: { id },
    data: {
      name,
      description: String(formData.get("description") || "").trim() || null,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  await requireAuth();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
}
