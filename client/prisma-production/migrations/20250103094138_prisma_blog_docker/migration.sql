/*
  Warnings:

  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like_Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_Collection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Like_Status" DROP CONSTRAINT "Like_Status_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Like_Status" DROP CONSTRAINT "Like_Status_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Post_Collection" DROP CONSTRAINT "Post_Collection_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "Post_Collection" DROP CONSTRAINT "Post_Collection_post_id_fkey";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Like_Status";

-- DropTable
DROP TABLE "Post_Collection";
