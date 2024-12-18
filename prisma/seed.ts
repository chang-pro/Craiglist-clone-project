import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  await prisma.category.createMany({
    data: [
      { id: "motors", name: "Motors", slug: "motors" },
      { id: "buy-sell", name: "Buy/Sell/Trade", slug: "buy-sell" },
      { id: "property", name: "Property", slug: "property" },
      { id: "services", name: "Services", slug: "services" },
      { id: "pets", name: "Pets", slug: "pets" },
      { id: "community", name: "Community", slug: "community" },
      { id: "jobs", name: "Jobs", slug: "jobs" },
    ],
  });

  console.log('Database has been seeded with categories!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
