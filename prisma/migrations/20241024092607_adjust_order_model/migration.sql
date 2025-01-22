/*
  Warnings:

  - You are about to drop the column `item` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[receiptNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishTime` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiptNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalChanges` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalItems` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPaid` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPayment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitNumber` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "item",
DROP COLUMN "price",
DROP COLUMN "quantity",
ADD COLUMN     "addOns" TEXT[],
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "finishTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "receiptNumber" TEXT NOT NULL,
ADD COLUMN     "serviceType" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalChanges" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalItems" INTEGER NOT NULL,
ADD COLUMN     "totalPaid" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalPayment" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unitName" TEXT NOT NULL,
ADD COLUMN     "unitNumber" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_receiptNumber_key" ON "Order"("receiptNumber");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
