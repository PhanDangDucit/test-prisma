/*
  Warnings:

  - You are about to drop the column `post_type_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Post_Type` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[author_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_post_type_id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "post_type_id",
ADD COLUMN     "author_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Post_Type";

-- CreateIndex
CREATE UNIQUE INDEX "Post_author_id_key" ON "Post"("author_id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
