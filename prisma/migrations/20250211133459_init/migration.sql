/*
  Warnings:

  - Changed the type of `lat` on the `Store` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lng` on the `Store` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "lat",
ADD COLUMN     "lat" INTEGER NOT NULL,
DROP COLUMN "lng",
ADD COLUMN     "lng" INTEGER NOT NULL;
