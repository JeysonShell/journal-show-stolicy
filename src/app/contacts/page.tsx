export const metadata = { title: "Контакты" };

export default function ContactsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-medium">Связаться с редакцией</h1>

      <div className="mt-6 space-y-4">
        <div>
          <div className="text-sm text-muted-foreground">Email редакции</div>
          <a href="mailto:editor@show-stolicy.ru" className="text-gold hover:underline">
            editor@show-stolicy.ru
          </a>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Основной сайт</div>
          <a
            href="https://show-stolicy.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            show-stolicy.ru
          </a>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Telegram</div>
          <a
            href="https://t.me/show_stolicy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            @show_stolicy
          </a>
        </div>
      </div>
    </article>
  );
}
