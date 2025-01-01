/*
  Warnings:

  - You are about to drop the column `post_role_id` on the `Post_User` table. All the data in the column will be lost.
  - You are about to drop the `Post_Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Post_User" DROP COLUMN "post_role_id";

-- DropTable
DROP TABLE "Post_Role";
