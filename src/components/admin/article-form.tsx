"use client";

import { useState } from "react";
import Link from "next/link";
import { TiptapEditor } from "./tiptap-editor";

type Category = { id: string; name: string };
type Project = { id: string; name: string };

type Article = {
  id?: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: string;
  categoryId: string | null;
  projectId: string | null;
  seoTitle: string | null;
  seoDesc: string | null;
  publishedAt: Date | null;
};

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  categories: Category[];
  projects: Project[];
  initial?: Article;
  submitLabel?: string;
};

export function ArticleForm({
  action,
  categories,
  projects,
  initial,
  submitLabel = "Сохранить",
}: Props) {
  const [content, setContent] = useState(initial?.content || "");
  const [status, setStatus] = useState(initial?.status || "DRAFT");

  const publishedValue = initial?.publishedAt
    ? new Date(initial.publishedAt).toISOString().slice(0, 16)
    : "";

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="content" value={content} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Заголовок *
            </label>
            <input
              id="title"
              name="title"
              required
              defaultValue={initial?.title || ""}
              placeholder="Как создаётся..."
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-lg outline-none focus:border-gold"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="text-sm font-medium">
              Краткое описание
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              defaultValue={initial?.excerpt || ""}
              placeholder="1-2 предложения — покажется на главной"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Содержание</label>
            <div className="mt-2">
              <TiptapEditor value={content} onChange={setContent} />
            </div>
          </div>

          <details className="rounded-lg border border-border bg-card p-4">
            <summary className="cursor-pointer text-sm font-medium">SEO</summary>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="seoTitle" className="text-sm">
                  SEO Title
                </label>
                <input
                  id="seoTitle"
                  name="seoTitle"
                  defaultValue={initial?.seoTitle || ""}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="seoDesc" className="text-sm">
                  SEO Description
                </label>
                <textarea
                  id="seoDesc"
                  name="seoDesc"
                  rows={2}
                  defaultValue={initial?.seoDesc || ""}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>
          </details>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-4">
            <label htmlFor="status" className="text-sm font-medium">
              Статус
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
            >
              <option value="DRAFT">Черновик</option>
              <option value="REVIEW">На ревью</option>
              <option value="PUBLISHED">Опубликовано</option>
              <option value="ARCHIVED">Архив</option>
            </select>

            {status === "PUBLISHED" && (
              <div className="mt-4">
                <label htmlFor="publishedAt" className="text-sm font-medium">
                  Дата публикации
                </label>
                <input
                  id="publishedAt"
                  name="publishedAt"
                  type="datetime-local"
                  defaultValue={publishedValue}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <label htmlFor="categoryId" className="text-sm font-medium">
              Рубрика
            </label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={initial?.categoryId || ""}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
            >
              <option value="">— Без рубрики —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label htmlFor="projectId" className="mt-4 block text-sm font-medium">
              Продвигаемый проект
            </label>
            <select
              id="projectId"
              name="projectId"
              defaultValue={initial?.projectId || ""}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
            >
              <option value="">— Без проекта —</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <label htmlFor="coverImage" className="text-sm font-medium">
              URL обложки
            </label>
            <input
              id="coverImage"
              name="coverImage"
              type="url"
              defaultValue={initial?.coverImage || ""}
              placeholder="https://..."
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gold-hover"
            >
              {submitLabel}
            </button>
            <Link
              href="/admin/articles"
              className="w-full rounded-lg border border-border px-4 py-2.5 text-center text-sm transition-colors hover:bg-muted"
            >
              Отмена
            </Link>
          </div>
        </aside>
      </div>
    </form>
  );
}
