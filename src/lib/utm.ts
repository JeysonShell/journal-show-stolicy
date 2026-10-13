export function buildUtmUrl(baseUrl: string, slug: string) {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("utm_source", "journal");
    url.searchParams.set("utm_medium", "article");
    url.searchParams.set("utm_campaign", slug);
    return url.toString();
  } catch {
    return baseUrl;
  }
}
