export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  project: string;
  author: string;
  publishedAt: string;
  readingTime: number;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  externalUrl: string;
  color: string;
};

export const projects: Project[] = [
  {
    slug: "shou-stolicy",
    name: "Шоу Столицы",
    description: "Главное шоу сезона — музыка, свет, эмоции.",
    externalUrl: "https://show-stolicy.ru",
    color: "#D4AF37",
  },
  {
    slug: "zvezdnyy-bal",
    name: "Звёздный бал",
    description: "Ежегодная церемония с участием звёзд эстрады.",
    externalUrl: "https://show-stolicy.ru/zvezdnyy-bal",
    color: "#8B5CF6",
  },
  {
    slug: "noch-teatra",
    name: "Ночь театра",
    description: "Иммерсивный фестиваль на 12 площадках города.",
    externalUrl: "https://show-stolicy.ru/noch-teatra",
    color: "#06B6D4",
  },
];

export const articles: Article[] = [
  {
    slug: "kak-sozdaetsya-shou-stolicy",
    title: "Как создаётся «Шоу Столицы»: за кулисами главного проекта года",
    excerpt: "Мы провели две недели с командой и узнали, как рождается шоу, которое собирает полные залы.",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200",
    category: "За кулисами",
    project: "shou-stolicy",
    author: "Анна Соколова",
    publishedAt: "2026-10-10",
    readingTime: 8,
  },
  {
    slug: "zvezdnyy-bal-2026",
    title: "«Звёздный бал 2026»: кто выйдет на сцену в этом сезоне",
    excerpt: "Официальный список участников, новые номера и сюрпризы, которые готовит режиссёрская группа.",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200",
    category: "Афиша",
    project: "zvezdnyy-bal",
    author: "Игорь Волков",
    publishedAt: "2026-10-08",
    readingTime: 6,
  },
  {
    slug: "immersivnyy-teatr",
    title: "Почему иммерсивный театр — главный тренд 2026 года",
    excerpt: "Разбираем, как «Ночь театра» переворачивает представление о классической сцене.",
    cover: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200",
    category: "Гайды",
    project: "noch-teatra",
    author: "Мария Летова",
    publishedAt: "2026-10-05",
    readingTime: 10,
  },
  {
    slug: "intervyu-s-rezhisserom",
    title: "Интервью с режиссёром: «Шоу должно дышать вместе со зрителем»",
    excerpt: "Большой разговор о том, как построить шоу, которое остаётся в памяти на годы.",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
    category: "Интервью",
    project: "shou-stolicy",
    author: "Анна Соколова",
    publishedAt: "2026-10-01",
    readingTime: 12,
  },
];
