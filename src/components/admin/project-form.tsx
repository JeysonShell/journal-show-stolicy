"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  initial?: {
    name: string;
    description: string | null;
    externalUrl: string | null;
    accentColor: string;
  };
  submitLabel?: string;
};

export function ProjectForm({ action, initial, submitLabel = "Сохранить" }: Props) {
  const [color, setColor] = useState(initial?.accentColor || "#D4AF37");

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

      <div>
        <label htmlFor="externalUrl" className="text-sm font-medium">
          URL сайта проекта
        </label>
        <input
          id="externalUrl"
          name="externalUrl"
          type="url"
          defaultValue={initial?.externalUrl || ""}
          placeholder="https://show-stolicy.ru"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="accentColor" className="text-sm font-medium">
          Акцентный цвет
        </label>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-16 cursor-pointer rounded border border-border bg-background"
          />
          <input
            id="accentColor"
            name="accentColor"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-40 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="rounded-lg bg-gold px-6 py-2.5 text-sm font-medium text-ink hover:bg-gold-hover"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/projects"
          className="rounded-lg border border-border px-6 py-2.5 text-sm hover:bg-muted"
        >
          Отмена
        </Link>
      </div>
    </form>
  );
}
