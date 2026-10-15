import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

async function logoutAction() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const nav = [
    { href: "/admin", label: "Дашборд" },
    { href: "/admin/articles", label: "Статьи" },
    { href: "/admin/projects", label: "Проекты" },
    { href: "/admin/categories", label: "Рубрики" },
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 md:flex-row md:gap-8 md:px-6 md:py-10">
      <aside className="w-full shrink-0 md:w-56">
        <div className="mb-8">
          <Link href="/" className="text-lg font-medium">
            Журнал <span className="text-gold">Столицы</span>
          </Link>
          <div className="mt-1 text-xs text-muted-foreground">Админка</div>
        </div>

        <nav className="flex flex-wrap gap-1 md:block md:space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:block"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 border-t border-border pt-6">
          <div className="text-xs text-muted-foreground">Вы вошли как</div>
          <div className="mt-1 truncate text-sm font-medium">
            {session.user.name || session.user.email}
          </div>
          <div className="mt-1 text-xs uppercase tracking-widest text-gold">
            {session.user.role}
          </div>

          <form action={logoutAction} className="mt-4">
            <button
              type="submit"
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              Выйти →
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
