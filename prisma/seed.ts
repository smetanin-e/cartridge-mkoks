import { PrismaClient } from '@prisma/client';
import { cartridges, models } from './constants';
const prisma = new PrismaClient();

async function generateData() {
  await prisma.model.createMany({
    data: models,
  });

  await prisma.cartridge.createMany({
    data: cartridges,
  });
}

async function clearData() {
  await prisma.$executeRaw`TRUNCATE TABLE "Model" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cartridge" RESTART IDENTITY CASCADE`;
  //await prisma.$executeRaw`TRUNCATE TABLE "Session" RESTART IDENTITY CASCADE`;
  //await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  //await prisma.$executeRaw`TRUNCATE TABLE "SubCategory" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await clearData();
    await generateData();
  } catch (error) {
    console.log(error);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
