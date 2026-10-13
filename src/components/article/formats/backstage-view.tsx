type Props = { content: string };

export function BackstageView({ content }: Props) {
  const parts = content.split(/(<img[^>]*>|<\/p>)/).filter(Boolean);
  const segments: Array<{ type: "text" | "image"; value: string }> = [];

  let buffer = "";
  for (const part of parts) {
    if (part.startsWith("<img")) {
      if (buffer.trim()) segments.push({ type: "text", value: buffer });
      buffer = "";
      segments.push({ type: "image", value: part });
    } else if (part === "</p>") {
      if (buffer.trim()) segments.push({ type: "text", value: buffer });
      buffer = "";
    } else {
      buffer += part;
    }
  }
  if (buffer.trim()) segments.push({ type: "text", value: buffer });

  return (
    <div className="space-y-12">
      {segments.map((s, i) => {
        if (s.type === "image") {
          return (
            <figure
              key={i}
              className="relative overflow-hidden rounded-2xl border border-border"
            >
              <div
                className="prose prose-invert max-w-none [&_img]:w-full [&_img]:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: s.value }}
              />
              <figcaption className="border-t border-border bg-card/50 px-4 py-2 text-xs text-muted-foreground">
                Кадр из-за кулис
              </figcaption>
            </figure>
          );
        }

        const clean = s.value.replace(/<[^>]+>/g, " ").trim();
        if (!clean) return null;

        return (
          <p
            key={i}
            className="text-lg leading-relaxed text-foreground/90 first:first-letter:float-left first:first-letter:mr-3 first:first-letter:font-display first:first-letter:text-7xl first:first-letter:font-bold first:first-letter:leading-[0.85] first:first-letter:text-gold"
          >
            {clean}
          </p>
        );
      })}
    </div>
  );
}
