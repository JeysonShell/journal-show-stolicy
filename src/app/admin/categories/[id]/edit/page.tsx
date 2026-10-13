import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "@/components/admin/category-form";
import { updateCategory } from "@/lib/actions/categories";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  const action = updateCategory.bind(null, category.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Редактирование рубрики</h1>
      <p className="mt-2 text-muted-foreground">{category.name}</p>
      <div className="mt-10">
        <CategoryForm
          action={action}
          initial={{ name: category.name, description: category.description }}
        />
      </div>
    </div>
  );
}
