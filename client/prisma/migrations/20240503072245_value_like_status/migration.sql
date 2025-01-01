/*
  Warnings:

  - You are about to drop the column `icon` on the `Like_Status` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Like_Status` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value_like_status]` on the table `Like_Status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `icon_status` to the `Like_Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value_like_status` to the `Like_Status` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Like_Status_id_value_idx";

-- DropIndex
DROP INDEX "Like_Status_value_key";

-- AlterTable
ALTER TABLE "Like_Status" DROP COLUMN "icon",
DROP COLUMN "value",
ADD COLUMN     "icon_status" TEXT NOT NULL,
ADD COLUMN     "value_like_status" VARCHAR(30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_Status_value_like_status_key" ON "Like_Status"("value_like_status");

-- CreateIndex
CREATE INDEX "Like_Status_id_value_like_status_idx" ON "Like_Status"("id", "value_like_status");
