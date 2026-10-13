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
    <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
      <aside className="w-56 shrink-0">
        <div className="mb-8">
          <Link href="/" className="text-lg font-bold font-display">
            Журнал <span className="text-gold">Столицы</span>
          </Link>
          <div className="mt-1 text-xs text-muted-foreground">Админка</div>
        </div>

        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
