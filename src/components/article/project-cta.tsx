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
      <aside
        className="my-10 overflow-hidden rounded-xl border border-border bg-card"
        style={{ borderTopColor: project.accentColor, borderTopWidth: 3 }}
      >
        <div className="p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gold">
              <Ticket className="h-4 w-4" />
              Билеты на {project.name}
            </div>

            <h3 className="mt-3 text-2xl font-medium">
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
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-white hover:bg-gold-hover"
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
      className="my-10 block rounded-xl border border-border bg-card p-5"
      style={{ borderTopColor: project.accentColor, borderTopWidth: 3 }}
    >
      <div>
        <div className="text-sm text-muted-foreground">Проект</div>
        <h3 className="mt-1 text-xl font-medium">{project.name}</h3>
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
