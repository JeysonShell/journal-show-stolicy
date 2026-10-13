import { Quote } from "lucide-react";

type Props = {
  content: string;
  author: string;
  subtitle?: string | null;
};

export function InterviewView({ content, author, subtitle }: Props) {
  const blocks = content.split(/<\/p>/).filter(Boolean);

  return (
    <div className="space-y-10">
      {subtitle && (
        <div className="rounded-2xl border-l-4 border-gold bg-card/50 p-6 italic text-lg text-muted-foreground">
          <Quote className="mb-3 h-6 w-6 text-gold" />
          {subtitle}
        </div>
      )}

      <div className="space-y-8">
        {blocks.map((block, i) => {
          const clean = block.replace(/<p>|<h2>|<\/h2>|<blockquote>/g, "").trim();
          if (!clean) return null;

          const isQuestion = clean.includes("?") && clean.length < 300;
          const isQuote = /^(«|")/.test(clean);

          if (isQuestion) {
            return (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 text-xs font-bold uppercase tracking-widest text-gold pt-1 w-24">
                  Вопрос
                </div>
                <p className="text-xl font-medium leading-relaxed">{clean}</p>
              </div>
            );
          }

          if (isQuote) {
            return (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1 w-24">
                  Ответ
                </div>
                <p className="text-lg leading-relaxed text-foreground/90">
                  {clean}
                </p>
              </div>
            );
          }

          return (
            <p key={i} className="text-lg leading-relaxed text-foreground/90">
              {clean}
            </p>
          );
        })}
      </div>
    </div>
  );
}
