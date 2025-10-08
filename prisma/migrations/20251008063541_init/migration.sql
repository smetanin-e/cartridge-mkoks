-- CreateEnum
CREATE TYPE "public"."CartridgeStatus" AS ENUM ('SERVICE', 'WORKING', 'RESERVE', 'AVAILABLE', 'REFILL');

-- CreateEnum
CREATE TYPE "public"."BatchStatus" AS ENUM ('IN_PROGRESS', 'COMPLITED', 'PARTIAL_RETURN');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "surname" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Model" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cartridge" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "numericNumber" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "status" "public"."CartridgeStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Cartridge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Printer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Printer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Departament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Replacement" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "departamentId" INTEGER NOT NULL,
    "installedCartridgeNumber" TEXT,
    "removedCartridgeNumber" TEXT,
    "responsible" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Replacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceBatch" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."BatchStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "partialReturnDate" TEXT,

    CONSTRAINT "ServiceBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceBatchCartridge" (
    "id" TEXT NOT NULL,
    "cartridgeId" INTEGER NOT NULL,
    "serviceBatchId" TEXT NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "returnDate" TEXT,
    "returnResponsible" TEXT,
    "returnNotes" TEXT,

    CONSTRAINT "ServiceBatchCartridge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ModelToPrinter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ModelToPrinter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "public"."User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Session_refreshToken_key" ON "public"."Session"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Model_model_key" ON "public"."Model"("model");

-- CreateIndex
CREATE UNIQUE INDEX "Cartridge_number_key" ON "public"."Cartridge"("number");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceBatchCartridge_cartridgeId_serviceBatchId_key" ON "public"."ServiceBatchCartridge"("cartridgeId", "serviceBatchId");

-- CreateIndex
CREATE INDEX "_ModelToPrinter_B_index" ON "public"."_ModelToPrinter"("B");

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cartridge" ADD CONSTRAINT "Cartridge_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "public"."Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Replacement" ADD CONSTRAINT "Replacement_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "public"."Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Replacement" ADD CONSTRAINT "Replacement_installedCartridgeNumber_fkey" FOREIGN KEY ("installedCartridgeNumber") REFERENCES "public"."Cartridge"("number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Replacement" ADD CONSTRAINT "Replacement_removedCartridgeNumber_fkey" FOREIGN KEY ("removedCartridgeNumber") REFERENCES "public"."Cartridge"("number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceBatchCartridge" ADD CONSTRAINT "ServiceBatchCartridge_cartridgeId_fkey" FOREIGN KEY ("cartridgeId") REFERENCES "public"."Cartridge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceBatchCartridge" ADD CONSTRAINT "ServiceBatchCartridge_serviceBatchId_fkey" FOREIGN KEY ("serviceBatchId") REFERENCES "public"."ServiceBatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ModelToPrinter" ADD CONSTRAINT "_ModelToPrinter_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ModelToPrinter" ADD CONSTRAINT "_ModelToPrinter_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Printer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
