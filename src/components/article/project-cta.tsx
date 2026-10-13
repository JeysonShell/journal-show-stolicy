import { ArrowUpRight, Ticket, Calendar, MapPin } from "lucide-react";
import { buildUtmUrl } from "@/lib/utm";

type Props = {
  project: {
    name: string;
    description: string | null;
    externalUrl: string | null;
    accentColor: string;
  };
  articleSlug: string;
  variant?: "default" | "ticket";
};

export function ProjectCta({ project, articleSlug, variant = "default" }: Props) {
  if (!project.externalUrl) return null;

  const href = buildUtmUrl(project.externalUrl, articleSlug);
  const ticketHref = buildUtmUrl(project.externalUrl, `${articleSlug}-ticket`);

  if (variant === "ticket") {
    return (
      <aside className="my-16 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-card via-card to-gold/[0.05]">
        <div className="relative p-8 md:p-10">
          <div
            className="absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-25 blur-3xl"
            style={{ background: project.accentColor }}
          />

          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold">
              <Ticket className="h-4 w-4" />
              Билеты на {project.name}
            </div>

            <h3 className="mt-4 text-3xl font-bold font-display md:text-4xl">
              {project.name}
            </h3>

            {project.description && (
              <p className="mt-3 max-w-xl text-muted-foreground">
                {project.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Ближайшие даты
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Основная сцена
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={ticketHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-all hover:bg-gold-hover hover:shadow-[0_0_30px_-5px_var(--gold)]"
              >
                <Ticket className="h-4 w-4" />
                Купить билеты
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium transition-colors hover:border-gold/50 hover:text-gold"
              >
                О проекте
              </a>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative my-12 block overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-gold/40"
    >
      <div
        className="absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
        style={{ background: project.accentColor }}
      />
      <div className="relative">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Проект
        </div>
        <h3 className="mt-2 text-2xl font-bold">{project.name}</h3>
        {project.description && (
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            {project.description}
          </p>
        )}
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gold">
          Перейти на сайт проекта
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}
