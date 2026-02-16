import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '../../src/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

function createPrompt() {
  const category = faker.helpers.arrayElement([
    'Code Review',
    'Bug Report',
    'Testing',
    'E2E Testing',
  ]);
  const title = `${category}: ${faker.hacker.phrase()} ${faker.string.alphanumeric(4)}`;
  const content = [
    `Context: ${faker.lorem.sentences(2)}`,
    `Goal: ${faker.company.catchPhrase()}`,
    `Details: ${faker.lorem.paragraph(2)}`,
  ].join('\n\n');

  return { title, content };
}

async function seed() {
  if (!prisma) return;
  const count = Number(process.env.E2E_SEED_NUMBER ?? 20);
  await prisma.prompt.deleteMany();
  const data = Array.from({ length: count }, () => createPrompt());
  await prisma.prompt.createMany({ data });
  await prisma.$disconnect();
}

async function clearDatabase() {
  if (!prisma) return;
  await prisma.prompt.deleteMany();
  await prisma.$disconnect();
}

async function main() {
  await seed();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
