/*
  Warnings:

  - Made the column `parent_id` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parent_id_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "like_id" SET DEFAULT 0,
ALTER COLUMN "parent_id" SET NOT NULL,
ALTER COLUMN "parent_id" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
