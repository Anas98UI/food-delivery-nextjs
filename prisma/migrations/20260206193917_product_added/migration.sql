-- CreateTable
CREATE TABLE "ProductOption" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "additionalPrice" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductOption" ADD CONSTRAINT "ProductOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
