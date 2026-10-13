import { prisma } from "@/lib/prisma";

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 50,
    include: { category: true, author: true },
  });

  const items = articles
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${siteUrl}/article/${a.slug}</link>
      <guid>${siteUrl}/article/${a.slug}</guid>
      <pubDate>${(a.publishedAt || a.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${a.excerpt || ""}]]></description>
      ${a.category ? `<category><![CDATA[${a.category.name}]]></category>` : ""}
      <author><![CDATA[${a.author.name || a.author.email}]]></author>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Журнал Шоу Столицы</title>
    <link>${siteUrl}</link>
    <description>Редакционный журнал о главных событиях, проектах и людях столицы.</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
