/*
  Warnings:

  - The primary key for the `Post_Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Post_Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post_Role" DROP CONSTRAINT "Post_Role_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Post_Role_pkey" PRIMARY KEY ("id");
