import Link from "next/link";

export type ArticleCardData = {
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  readingTime?: number | null;
  category?: { name: string } | null;
};

export function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="aspect-[5/3] overflow-hidden bg-[#bdbdbd]">
        {article.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        {(article.category || article.readingTime) && (
          <div className="text-[13px] font-medium text-gold">
            {article.category?.name}
            {article.readingTime ? (
              <span className="font-normal text-muted-foreground">
                {article.category ? " · " : ""}
                {article.readingTime} мин
              </span>
            ) : null}
          </div>
        )}
        <h3 className="mt-2 text-lg font-medium leading-snug group-hover:text-gold">
          {article.title}
        </h3>
        {article.excerpt ? (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {article.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
