/*
  Warnings:

  - You are about to drop the `cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_user_carId_fkey";

-- DropForeignKey
ALTER TABLE "user_addresses" DROP CONSTRAINT "user_addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_car" DROP CONSTRAINT "user_car_carId_fkey";

-- DropForeignKey
ALTER TABLE "user_car" DROP CONSTRAINT "user_car_userId_fkey";

-- DropTable
DROP TABLE "cars";

-- DropTable
DROP TABLE "location";

-- DropTable
DROP TABLE "user_addresses";

-- DropTable
DROP TABLE "user_car";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAddress" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "rt" INTEGER NOT NULL,
    "rw" INTEGER NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "release_year" INTEGER NOT NULL,
    "plate_number" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCar" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "user_carId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Car_plate_number_key" ON "Car"("plate_number");

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCar" ADD CONSTRAINT "UserCar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCar" ADD CONSTRAINT "UserCar_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_user_carId_fkey" FOREIGN KEY ("user_carId") REFERENCES "UserCar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
