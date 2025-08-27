import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function generateData() {
  // --- 1. Создаём модели картриджей ---
  const models = await prisma.model.createMany({
    data: [
      { model: 'HP 101' },
      { model: 'Canon 202' },
      { model: 'Epson 303' },
      { model: 'Brother 404' },
    ],
  });

  // --- 2. Создаём картриджи ---
  await prisma.cartridge.createMany({
    data: [
      { number: 'MK101', modelId: 1 }, // HP 101
      { number: 'MK102', modelId: 1 },
      { number: 'CN201', modelId: 2 }, // Canon 202
      { number: 'EP301', modelId: 3 }, // Epson 303
      { number: 'BR401', modelId: 4 }, // Brother 404
    ],
  });

  // --- 3. Создаём принтеры ---
  await prisma.printer.createMany({
    data: [
      { name: 'Printer A' },
      { name: 'Printer B' },
      { name: 'Printer C' },
      { name: 'Printer D' },
      { name: 'Printer E' },
    ],
  });

  // --- 4. Привязываем модели к принтерам ---
  // Printer A → HP 101 + Canon 202
  await prisma.printer.update({
    where: { id: 1 },
    data: {
      models: { connect: [{ id: 1 }, { id: 2 }] },
    },
  });

  // Printer B → Epson 303 + Brother 404
  await prisma.printer.update({
    where: { id: 2 },
    data: {
      models: { connect: [{ id: 3 }, { id: 4 }] },
    },
  });

  // --- 5. Создаём департаменты ---
  await prisma.departament.createMany({
    data: [{ name: 'IT' }, { name: 'HR' }, { name: 'Finance' }],
  });

  // --- 6. Создаём записи о заменах ---
  await prisma.replacement.create({
    data: {
      date: new Date('2025-08-01'),
      departamentId: 1, // IT
      installedCartridgeNumber: 'MK101',
      removedCartridgeNumber: 'MK102',
      responsible: 'Иванов И.И.',
    },
  });

  await prisma.replacement.create({
    data: {
      date: new Date('2025-08-05'),
      departamentId: 2, // HR
      installedCartridgeNumber: 'CN201',
      removedCartridgeNumber: null, // поставили новый, ничего не снимали
      responsible: 'Петров П.П.',
    },
  });
}

async function clearData() {
  await prisma.$executeRaw`TRUNCATE TABLE "Model" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cartridge" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Printer" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Replacement" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Departament" RESTART IDENTITY CASCADE`;
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
