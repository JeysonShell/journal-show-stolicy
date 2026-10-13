import { CategoryForm } from "@/components/admin/category-form";
import { createCategory } from "@/lib/actions/categories";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Новая рубрика</h1>
      <div className="mt-10">
        <CategoryForm action={createCategory} submitLabel="Создать" />
      </div>
    </div>
  );
}
