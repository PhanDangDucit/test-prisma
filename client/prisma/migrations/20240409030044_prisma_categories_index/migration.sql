/*
  Warnings:

  - A unique constraint covering the columns `[name_post_type]` on the table `Post_Type` will be added. If there are existing duplicate values, this will fail.
  - Made the column `thumbnail` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `icon` to the `Post_Type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "thumbnail" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post_Type" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Post_Type_name_post_type_key" ON "Post_Type"("name_post_type");
