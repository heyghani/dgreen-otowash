/*
  Warnings:

  - You are about to drop the `_OrderServices` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[receiptNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_OrderServices" DROP CONSTRAINT "_OrderServices_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderServices" DROP CONSTRAINT "_OrderServices_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'in_progress',
ALTER COLUMN "finishTime" DROP NOT NULL,
ALTER COLUMN "totalChanges" DROP NOT NULL,
ALTER COLUMN "totalItems" DROP NOT NULL,
ALTER COLUMN "totalPaid" DROP NOT NULL,
ALTER COLUMN "totalPayment" DROP NOT NULL;

-- DropTable
DROP TABLE "_OrderServices";

-- CreateTable
CREATE TABLE "OrderService" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "serviceType" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_receiptNumber_key" ON "Order"("receiptNumber");

-- AddForeignKey
ALTER TABLE "OrderService" ADD CONSTRAINT "OrderService_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderService" ADD CONSTRAINT "OrderService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
