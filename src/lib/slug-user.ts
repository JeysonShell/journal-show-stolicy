import slugify from "slugify";

export function userSlug(name: string, email: string) {
  const base = name ? slugify(name, { lower: true, strict: true, locale: "ru" }) : email.split("@")[0];
  return base || "author";
}
