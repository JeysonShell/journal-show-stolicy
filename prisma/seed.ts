import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const readingTime = (text: string) =>
  Math.max(1, Math.round(text.split(/\s+/).length / 200));

async function main() {
  console.log("🌱 Seeding...");

  await prisma.article.deleteMany();
  await prisma.project.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("admin12345", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@journal.local",
      password: passwordHash,
      name: "Администратор",
      bio: "Управляет журналом.",
      role: "ADMIN",
    },
  });

  const anna = await prisma.user.create({
    data: {
      email: "anna@show-stolicy.ru",
      password: passwordHash,
      name: "Анна Соколова",
      bio: "Главный редактор журнала.",
      role: "EDITOR",
    },
  });

  const igor = await prisma.user.create({
    data: {
      email: "igor@show-stolicy.ru",
      password: passwordHash,
      name: "Игорь Волков",
      bio: "Обозреватель. Афиша и интервью.",
      role: "AUTHOR",
    },
  });

  const maria = await prisma.user.create({
    data: {
      email: "maria@show-stolicy.ru",
      password: passwordHash,
      name: "Мария Летова",
      bio: "Культуролог и автор гайдов.",
      role: "AUTHOR",
    },
  });

  const catZaKulisami = await prisma.category.create({
    data: { slug: "za-kulisami", name: "За кулисами", description: "Как создаются главные проекты" },
  });
  const catAfisha = await prisma.category.create({
    data: { slug: "afisha", name: "Афиша", description: "Что смотреть в этом сезоне" },
  });
  const catIntervyu = await prisma.category.create({
    data: { slug: "intervyu", name: "Интервью", description: "Большие разговоры" },
  });
  const catGaidy = await prisma.category.create({
    data: { slug: "gaidy", name: "Гайды", description: "Полезное о культуре" },
  });

  const projShou = await prisma.project.create({
    data: {
      slug: "shou-stolicy",
      name: "Шоу Столицы",
      description: "Главное шоу сезона — музыка, свет, эмоции.",
      externalUrl: "https://show-stolicy.ru",
      accentColor: "#D4AF37",
    },
  });
  const projBal = await prisma.project.create({
    data: {
      slug: "zvezdnyy-bal",
      name: "Звёздный бал",
      description: "Ежегодная церемония с участием звёзд эстрады.",
      externalUrl: "https://show-stolicy.ru/zvezdnyy-bal",
      accentColor: "#8B5CF6",
    },
  });
  const projTeatr = await prisma.project.create({
    data: {
      slug: "noch-teatra",
      name: "Ночь театра",
      description: "Иммерсивный фестиваль на 12 площадках города.",
      externalUrl: "https://show-stolicy.ru/noch-teatra",
      accentColor: "#06B6D4",
    },
  });

  const articlesData = [
    {
      slug: "kak-sozdaetsya-shou-stolicy",
      title: "Как создаётся «Шоу Столицы»: за кулисами главного проекта года",
      excerpt: "Мы провели две недели с командой и узнали, как рождается шоу, которое собирает полные залы.",
      content: "<p>Вот уже третий сезон подряд «Шоу Столицы» собирает полные залы.</p><h2>Начало пути</h2><p>Каждое шоу начинается с идеи.</p><blockquote>«Мы делаем историю, которую зритель проживает вместе с нами»</blockquote>",
      coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600",
      categoryId: catZaKulisami.id,
      projectId: projShou.id,
      authorId: anna.id,
      publishedAt: new Date("2026-10-10"),
    },
    {
      slug: "zvezdnyy-bal-2026",
      title: "«Звёздный бал 2026»: кто выйдет на сцену в этом сезоне",
      excerpt: "Официальный список участников, новые номера и сюрпризы.",
      content: "<p>«Звёздный бал 2026» обещает стать самым громким событием сезона.</p><h2>Главные звёзды</h2><p>На сцену выйдут артисты, чьи имена знакомы каждому.</p>",
      coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600",
      categoryId: catAfisha.id,
      projectId: projBal.id,
      authorId: igor.id,
      publishedAt: new Date("2026-10-08"),
    },
    {
      slug: "immersivnyy-teatr",
      title: "Почему иммерсивный театр — главный тренд 2026 года",
      excerpt: "Разбираем, как «Ночь театра» переворачивает представление о классической сцене.",
      content: "<p>Иммерсивный театр перестал быть экспериментом — это новый мейнстрим.</p><h2>Что такое иммерсивность</h2><p>В иммерсивном театре нет сцены в привычном понимании.</p>",
      coverImage: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=1600",
      categoryId: catGaidy.id,
      projectId: projTeatr.id,
      authorId: maria.id,
      publishedAt: new Date("2026-10-05"),
    },
    {
      slug: "intervyu-s-rezhisserom",
      title: "Интервью с режиссёром: «Шоу должно дышать вместе со зрителем»",
      excerpt: "Большой разговор о том, как построить шоу, которое остаётся в памяти на годы.",
      content: "<p>Мы поговорили с режиссёром «Шоу Столицы» Игорем Петровым.</p><h2>О зрителе</h2><p>«Шоу должно дышать вместе со зрителем».</p>",
      coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600",
      categoryId: catIntervyu.id,
      projectId: projShou.id,
      authorId: anna.id,
      publishedAt: new Date("2026-10-01"),
    },
  ];

  for (const a of articlesData) {
    await prisma.article.create({
      data: {
        ...a,
        status: "PUBLISHED",
        readingTime: readingTime(a.content.replace(/<[^>]+>/g, " ")),
        seoTitle: a.title,
        seoDesc: a.excerpt,
      },
    });
  }

  console.log("✅ Готово. Логин: admin@journal.local / пароль: admin12345");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
