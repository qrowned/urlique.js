/*
  Warnings:

  - You are about to drop the column `displayId` on the `UrlData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[display_id]` on the table `UrlData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `display_id` to the `UrlData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UrlData_displayId_key";

-- AlterTable
ALTER TABLE "UrlData" DROP COLUMN "displayId",
ADD COLUMN     "display_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UrlData_display_id_key" ON "UrlData"("display_id");
