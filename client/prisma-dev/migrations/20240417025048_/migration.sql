/*
  Warnings:

  - You are about to drop the column `post_status_id` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `Post_User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Post_User` table. All the data in the column will be lost.
  - You are about to drop the column `isFavorite` on the `Post_User` table. All the data in the column will be lost.
  - You are about to drop the `Post_Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_post_status_id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "post_status_id";

-- AlterTable
ALTER TABLE "Post_User" DROP CONSTRAINT "Post_User_pkey",
DROP COLUMN "id",
DROP COLUMN "isFavorite",
ADD CONSTRAINT "Post_User_pkey" PRIMARY KEY ("user_id", "post_id");

-- DropTable
DROP TABLE "Post_Status";
