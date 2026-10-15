import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  try {
    await signIn("credentials", { email, password, redirectTo: "/admin" });
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    redirect("/login?error=1");
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6">
      <Link href="/" className="mb-10 text-2xl font-medium">
        Журнал <span className="text-gold">Столицы</span>
      </Link>

      <div className="rounded-2xl border border-border bg-card p-8">
        <h1 className="text-2xl font-bold">Вход в редакцию</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Только для авторов и редакторов журнала.
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
            Неверный email или пароль.
          </div>
        )}

        <form action={loginAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
              placeholder="admin@journal.local"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-hover"
          >
            Войти
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-muted/40 p-4 text-xs">
          <div className="font-medium">Демо-доступ:</div>
          <div className="mt-1 text-muted-foreground">
            admin@journal.local / admin12345
          </div>
        </div>
      </div>
    </div>
  );
}
