/*
  Warnings:

  - Made the column `rating` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Property" ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "rating" SET NOT NULL;
