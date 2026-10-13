"use client";

import { useActionState } from "react";
import { subscribeAction, type SubscribeState } from "@/lib/actions/subscribe";

const initial: SubscribeState = { ok: false, message: "" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeAction, initial);

  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-gold/[0.05] p-10 md:p-14">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-gold">
          Дайджест
        </div>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
          Раз в неделю — самое важное
        </h2>
        <p className="mt-4 text-muted-foreground">
          Афиша, интервью, репортажи из-за кулис. Без спама и лишних писем.
        </p>

        <form action={action} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            name="email"
            required
            placeholder="ваш@email.ru"
            className="flex-1 rounded-full border border-border bg-background px-6 py-4 text-sm outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-gold px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-gold-hover disabled:opacity-60"
          >
            {pending ? "Отправляем..." : "Подписаться"}
          </button>
        </form>

        {state.message && (
          <p
            className={`mt-4 text-sm ${
              state.ok ? "text-gold" : "text-destructive"
            }`}
          >
            {state.message}
          </p>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
        </p>
      </div>
    </div>
  );
}
