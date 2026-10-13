import { Calendar, Clock, MapPin } from "lucide-react";

type Props = { content: string };

export function AfishaView({ content }: Props) {
  const items = content
    .split(/<h2>/)
    .filter(Boolean)
    .map((chunk) => {
      const [title, ...rest] = chunk.split(/<\/h2>/);
      const body = rest
        .join("")
        .replace(/<[^>]+>/g, " ")
        .trim()
        .slice(0, 200);
      return { title: title.replace(/<[^>]+>/g, "").trim(), body };
    })
    .filter((x) => x.title);

  if (items.length === 0) {
    return (
      <div
        className="prose prose-lg prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-gold/40"
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition-opacity group-hover:bg-gold/20" />

          <div className="relative">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gold">
              <Calendar className="h-3.5 w-3.5" />
              Событие
            </div>

            <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
              {item.title}
            </h3>

            {item.body && (
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                {item.body}
              </p>
            )}

            <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Уточняется
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> Основная сцена
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
