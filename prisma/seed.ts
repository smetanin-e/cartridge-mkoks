import { PrismaClient } from '@prisma/client';
import { cartridges, models, printers } from './constants';
const prisma = new PrismaClient();

async function generateData() {
  await prisma.model.createMany({
    data: models,
  });

  await prisma.cartridge.createMany({
    data: cartridges,
  });

  await prisma.printer.createMany({
    data: printers,
  });

  await prisma.printer.update({
    where: { id: 1 },
    data: {
      models: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });

  await prisma.printer.update({
    where: { id: 6 },
    data: {
      models: {
        connect: [{ id: 7 }, { id: 8 }],
      },
    },
  });
  const printerIds = [3, 4, 5];
  for (const printerId of printerIds) {
    await prisma.printer.update({
      where: { id: printerId },
      data: {
        models: {
          connect: [{ id: 3 }, { id: 4 }],
        },
      },
    });
  }

  const printerIds2 = [7, 8];
  for (const printerId of printerIds2) {
    await prisma.printer.update({
      where: { id: printerId },
      data: {
        models: {
          connect: [{ id: 9 }, { id: 10 }],
        },
      },
    });
  }
  //пример для создания нового принтера
  //   await prisma.printer.create({
  //   data: {
  //     name: "HP LaserJet P2055dn",
  //     models: {
  //       connect: [
  //         { model: "HP 05A" },
  //         { model: "HP 05X" },
  //       ],
  //     },
  //   },
  // });
}

async function clearData() {
  await prisma.$executeRaw`TRUNCATE TABLE "Model" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cartridge" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Printer" RESTART IDENTITY CASCADE`;
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
