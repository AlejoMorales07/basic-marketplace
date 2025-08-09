/*
  Warnings:

  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('CLIENT', 'BUSINESS');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "userType" "public"."UserType" NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;
