"use client";

import { useActionState } from "react";
import { subscribeAction, type SubscribeState } from "@/lib/actions/subscribe";

const initial: SubscribeState = { ok: false, message: "" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeAction, initial);

  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
      <h2 className="text-2xl font-medium">Раз в неделю — самое важное</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Афиша, интервью, репортажи из-за кулис. Без спама и лишних писем.
      </p>

      <form action={action} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          placeholder="ваш@email.ru"
          className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-white hover:bg-gold-hover disabled:opacity-60"
        >
          {pending ? "Отправляем..." : "Подписаться"}
        </button>
      </form>

      {state.message && (
        <p className={`mt-4 text-sm ${state.ok ? "text-gold" : "text-destructive"}`}>
          {state.message}
        </p>
      )}
    </div>
  );
}
