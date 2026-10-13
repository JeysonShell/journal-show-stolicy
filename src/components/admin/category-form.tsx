"use client";

import Link from "next/link";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  initial?: { name: string; description: string | null };
  submitLabel?: string;
};

export function CategoryForm({ action, initial, submitLabel = "Сохранить" }: Props) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Название *
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={initial?.name || ""}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium">
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={initial?.description || ""}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="rounded-lg bg-gold px-6 py-2.5 text-sm font-medium text-ink hover:bg-gold-hover"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/categories"
          className="rounded-lg border border-border px-6 py-2.5 text-sm hover:bg-muted"
        >
          Отмена
        </Link>
      </div>
    </form>
  );
}
