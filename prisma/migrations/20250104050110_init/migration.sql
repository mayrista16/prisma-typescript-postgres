/*
  Warnings:

  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_user_carId_fkey";

-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCar" DROP CONSTRAINT "UserCar_carId_fkey";

-- DropForeignKey
ALTER TABLE "UserCar" DROP CONSTRAINT "UserCar_userId_fkey";

-- DropTable
DROP TABLE "Car";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserAddress";

-- DropTable
DROP TABLE "UserCar";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_addresses" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "rt" INTEGER NOT NULL,
    "rw" INTEGER NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "release_year" INTEGER NOT NULL,
    "plate_number" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_cars" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "user_carId" INTEGER NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "cars_plate_number_key" ON "cars"("plate_number");

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_cars" ADD CONSTRAINT "user_cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_cars" ADD CONSTRAINT "user_cars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_carId_fkey" FOREIGN KEY ("user_carId") REFERENCES "user_cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
