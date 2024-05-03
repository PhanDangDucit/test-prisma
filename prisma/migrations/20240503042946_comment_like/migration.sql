/*
  Warnings:

  - You are about to drop the column `like_id` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `comment_id` to the `Like_Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Like_Status` table without a default value. This is not possible if the table is not empty.
  - Made the column `icon` on table `Like_Status` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "like_id";

-- AlterTable
ALTER TABLE "Like_Status" ADD COLUMN     "comment_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "icon" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Like_Status" ADD CONSTRAINT "Like_Status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_Status" ADD CONSTRAINT "Like_Status_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
