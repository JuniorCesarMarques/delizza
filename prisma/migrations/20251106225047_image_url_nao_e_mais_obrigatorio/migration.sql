/*
  Warnings:

  - Made the column `imageUrl` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Category" ALTER COLUMN "imageUrl" SET NOT NULL;
