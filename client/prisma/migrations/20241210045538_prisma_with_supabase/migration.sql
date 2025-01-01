/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `creator_programs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `creator_system_programs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `discounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feeling_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_collections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts_post_collections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `program_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_followers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_system_programs` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Show" AS ENUM ('Show', 'Hidden');

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "creator_programs" DROP CONSTRAINT "creator_programs_author_id_fkey";

-- DropForeignKey
ALTER TABLE "creator_programs" DROP CONSTRAINT "creator_programs_csp_id_fkey";

-- DropForeignKey
ALTER TABLE "post_collections" DROP CONSTRAINT "post_collections_user_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_post_author_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_post_type_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_post_collections" DROP CONSTRAINT "posts_post_collections_post_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_post_collections" DROP CONSTRAINT "posts_post_collections_post_id_fkey";

-- DropForeignKey
ALTER TABLE "program_users" DROP CONSTRAINT "program_users_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "program_users" DROP CONSTRAINT "program_users_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "program_users" DROP CONSTRAINT "program_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "program_users" DROP CONSTRAINT "program_users_usp_id_fkey";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "creator_programs";

-- DropTable
DROP TABLE "creator_system_programs";

-- DropTable
DROP TABLE "discounts";

-- DropTable
DROP TABLE "feeling_status";

-- DropTable
DROP TABLE "notifications";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "post_collections";

-- DropTable
DROP TABLE "post_types";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "posts_post_collections";

-- DropTable
DROP TABLE "program_users";

-- DropTable
DROP TABLE "user_followers";

-- DropTable
DROP TABLE "user_profiles";

-- DropTable
DROP TABLE "user_system_programs";

-- DropEnum
DROP TYPE "user_role";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(255),
    "username" VARCHAR(255),
    "password" VARCHAR(50),
    "avatar" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" INTEGER,
    "email" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 0,
    "is_show" "Show" NOT NULL DEFAULT 'Show',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "thumbnail" VARCHAR(255) NOT NULL,
    "post_type_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "is_show" "Show" NOT NULL DEFAULT 'Show',
    "author_id" INTEGER NOT NULL,
    "comment_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

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
    "value_like_status" VARCHAR(30) NOT NULL,
    "icon_status" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment_id" INTEGER NOT NULL,

    CONSTRAINT "Like_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "post_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "subcomment_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(30) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_Collection" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_id" INTEGER NOT NULL,
    "collection_id" INTEGER NOT NULL,

    CONSTRAINT "Post_Collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_Type_name_post_type_key" ON "Post_Type"("name_post_type");

-- CreateIndex
CREATE UNIQUE INDEX "Post_Type_priority_key" ON "Post_Type"("priority");

-- CreateIndex
CREATE UNIQUE INDEX "Like_Status_value_like_status_key" ON "Like_Status"("value_like_status");

-- CreateIndex
CREATE INDEX "Like_Status_id_value_like_status_idx" ON "Like_Status"("id", "value_like_status");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_value_key" ON "Collection"("value");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_post_type_id_fkey" FOREIGN KEY ("post_type_id") REFERENCES "Post_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_Status" ADD CONSTRAINT "Like_Status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_Status" ADD CONSTRAINT "Like_Status_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Collection" ADD CONSTRAINT "Post_Collection_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Collection" ADD CONSTRAINT "Post_Collection_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
