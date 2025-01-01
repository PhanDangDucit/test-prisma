-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_like_id_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "like_id" DROP NOT NULL,
ALTER COLUMN "like_id" DROP DEFAULT;
