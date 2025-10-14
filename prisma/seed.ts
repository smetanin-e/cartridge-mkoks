import { generateSalt, hashPassword } from '@/shared/lib/auth/passwordHasher';
import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();

async function generateData() {
  const user = {
    login: 'Admin',
    password: 'Mkoks2010',
    surname: 'MK',
    firstName: 'Администратор',
    lastName: '',
    role: UserRole.ADMIN,
  };
  const salt = generateSalt();
  const hashedPassword = await hashPassword(user.password, salt);

  await prisma.user.create({
    data: {
      login: user.login,
      password: hashedPassword,
      surname: user.surname,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as UserRole,
      salt,
    },
  });

  console.log('seed success');
}

async function clearData() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Model" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cartridge" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Printer" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Replacement" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Departament" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Session" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ServiceBatch" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ServiceBatchCartridge" RESTART IDENTITY CASCADE`;
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
