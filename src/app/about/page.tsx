export const metadata = { title: "О журнале" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-medium">Журнал Шоу Столицы</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
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
