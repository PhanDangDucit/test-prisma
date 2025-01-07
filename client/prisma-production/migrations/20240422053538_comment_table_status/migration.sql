/*
  Warnings:

  - You are about to drop the column `post_date` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Post_User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `post_type_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post_User" DROP CONSTRAINT "Post_User_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Post_User" DROP CONSTRAINT "Post_User_user_id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "post_date",
ADD COLUMN     "comment_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "post_type_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_show" "Show" NOT NULL DEFAULT 'Show';

-- DropTable
DROP TABLE "Post_User";

-- CreateTable
CREATE TABLE "Post_Type" (
    "id" SERIAL NOT NULL,
    "name_post_type" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT,

    CONSTRAINT "Post_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like_Status" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(30) NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Like_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "like_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_Type_name_post_type_key" ON "Post_Type"("name_post_type");

-- CreateIndex
CREATE UNIQUE INDEX "Post_Type_priority_key" ON "Post_Type"("priority");

-- CreateIndex
CREATE UNIQUE INDEX "Like_Status_value_key" ON "Like_Status"("value");

-- CreateIndex
CREATE INDEX "Like_Status_id_value_idx" ON "Like_Status"("id", "value");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_post_type_id_fkey" FOREIGN KEY ("post_type_id") REFERENCES "Post_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_like_id_fkey" FOREIGN KEY ("like_id") REFERENCES "Like_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
