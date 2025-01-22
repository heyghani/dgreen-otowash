/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AddOn` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `AddOn` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `AddOn` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `AddOn` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AddOn" DROP CONSTRAINT "AddOn_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_orderId_fkey";

-- DropIndex
DROP INDEX "Order_receiptNumber_key";

-- AlterTable
ALTER TABLE "AddOn" DROP COLUMN "createdAt",
DROP COLUMN "orderId",
DROP COLUMN "quantity",
DROP COLUMN "totalPrice";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerId",
DROP COLUMN "items",
ALTER COLUMN "discount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "createdAt",
DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderAddOn" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "addOnId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderAddOn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderServices_AB_unique" ON "_OrderServices"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderServices_B_index" ON "_OrderServices"("B");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddOn" ADD CONSTRAINT "OrderAddOn_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddOn" ADD CONSTRAINT "OrderAddOn_addOnId_fkey" FOREIGN KEY ("addOnId") REFERENCES "AddOn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderServices" ADD CONSTRAINT "_OrderServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderServices" ADD CONSTRAINT "_OrderServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
