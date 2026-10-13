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

export async function createProject(formData: FormData) {
  await requireAuth();
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Название обязательно");

  const baseSlug = makeSlug(name);
  let slug = baseSlug;
  let i = 1;
  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${i++}`;
  }

  await prisma.project.create({
    data: {
      slug,
      name,
      description: String(formData.get("description") || "").trim() || null,
      externalUrl: String(formData.get("externalUrl") || "").trim() || null,
      accentColor: String(formData.get("accentColor") || "#D4AF37"),
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Название обязательно");

  await prisma.project.update({
    where: { id },
    data: {
      name,
      description: String(formData.get("description") || "").trim() || null,
      externalUrl: String(formData.get("externalUrl") || "").trim() || null,
      accentColor: String(formData.get("accentColor") || "#D4AF37"),
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
