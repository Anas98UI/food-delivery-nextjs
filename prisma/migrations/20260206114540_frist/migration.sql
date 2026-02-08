/*
  Warnings:

  - You are about to drop the column `isFeactured` on the `Product` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isFeactured",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
