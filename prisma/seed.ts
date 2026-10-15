import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin12345", 10);

  const users = [
    {
      email: "admin@journal.local",
      name: "Администратор",
      slug: "administrator",
      bio: "Управляет журналом.",
      role: "ADMIN" as const,
    },
    {
      email: "anna@show-stolicy.ru",
      name: "Анна Соколова",
      slug: "anna-sokolova",
      bio: "Главный редактор журнала.",
      role: "EDITOR" as const,
    },
    {
      email: "igor@show-stolicy.ru",
      name: "Игорь Волков",
      slug: "igor-volkov",
      bio: "Обозреватель. Афиша и интервью.",
      role: "AUTHOR" as const,
    },
    {
      email: "maria@show-stolicy.ru",
      name: "Мария Летова",
      slug: "maria-letova",
      bio: "Культуролог и автор гайдов.",
      role: "AUTHOR" as const,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        slug: user.slug,
        bio: user.bio,
        role: user.role,
      },
      create: { ...user, password: passwordHash },
    });
  }

  const categories = [
    { slug: "za-kulisami", name: "За кулисами", description: "Как устроен вечер" },
    { slug: "afisha", name: "Афиша", description: "Что смотреть в этом сезоне" },
    { slug: "intervyu", name: "Интервью", description: "Разбор постановки вопросами" },
    { slug: "gaidy", name: "Гайды", description: "Полезное о культуре" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, description: category.description },
      create: category,
    });
  }

  await prisma.project.upsert({
    where: { slug: "shou-stolicy" },
    update: {
      name: "Шоу Столицы",
      description: "Афиша концертов и спектаклей.",
      externalUrl: "https://show-stolicy.ru",
      accentColor: "#AD382E",
    },
    create: {
      slug: "shou-stolicy",
      name: "Шоу Столицы",
      description: "Афиша концертов и спектаклей.",
      externalUrl: "https://show-stolicy.ru",
      accentColor: "#AD382E",
    },
  });

  console.log("Справочники на месте. Логин: admin@journal.local / admin12345");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
