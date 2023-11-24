-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "SKU" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "CBM" DOUBLE PRECISION NOT NULL,
    "parentProductSKU" TEXT NOT NULL,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productSKU" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entry" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "envioColombia" DOUBLE PRECISION NOT NULL,
    "costoDolares" DOUBLE PRECISION NOT NULL,
    "arancel" DOUBLE PRECISION NOT NULL,
    "iva" DOUBLE PRECISION NOT NULL,
    "empaque" DOUBLE PRECISION NOT NULL,
    "publicidad" DOUBLE PRECISION NOT NULL,
    "gastosOficina" DOUBLE PRECISION NOT NULL,
    "serial" TEXT,
    "parentProductSKU" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_SKU_key" ON "products"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_SKU_key" ON "product_variants"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "inventories_productSKU_key" ON "inventories"("productSKU");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_serial_key" ON "transactions"("serial");

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_parentProductSKU_fkey" FOREIGN KEY ("parentProductSKU") REFERENCES "products"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_productSKU_fkey" FOREIGN KEY ("productSKU") REFERENCES "product_variants"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_parentProductSKU_fkey" FOREIGN KEY ("parentProductSKU") REFERENCES "product_variants"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;
