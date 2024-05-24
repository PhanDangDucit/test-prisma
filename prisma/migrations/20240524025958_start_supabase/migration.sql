/*
  Warnings:

  - Made the column `subcomment_count` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "subcomment_count" SET NOT NULL,
ALTER COLUMN "subcomment_count" SET DEFAULT 0;
