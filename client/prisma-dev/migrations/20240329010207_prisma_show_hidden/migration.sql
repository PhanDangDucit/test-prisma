-- CreateEnum
CREATE TYPE "Show" AS ENUM ('Show', 'Hidden');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "is_show" "Show" NOT NULL DEFAULT 'Show',
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
