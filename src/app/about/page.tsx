export const metadata = { title: "О журнале" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-xs uppercase tracking-widest text-gold">О проекте</div>
      <h1 className="mt-4 text-5xl font-bold">Журнал Шоу Столицы</h1>
      <div className="mt-10 space-y-6 text-lg text-muted-foreground">
        <p>
          Мы рассказываем о главных культурных событиях столицы — больших шоу,
          фестивалях, театральных премьерах и людях, которые их создают.
        </p>
        <p>
          Каждый материал журнала связан с одним из проектов «Шоу Столицы».
          Так читатель может сразу перейти к тому, о чём прочитал.
        </p>
        <p>
          Наша редакция — это авторы, обозреватели и культурологи, которые
          любят своё дело и пишут о нём честно.
        </p>
      </div>
    </article>
  );
}
