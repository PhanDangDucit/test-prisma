/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee_Detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like_Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('User', 'Admin');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_department_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee_Detail" DROP CONSTRAINT "Employee_Detail_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "Like_Status" DROP CONSTRAINT "Like_Status_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Like_Status" DROP CONSTRAINT "Like_Status_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_post_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Post_Collection" DROP CONSTRAINT "Post_Collection_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "Post_Collection" DROP CONSTRAINT "Post_Collection_post_id_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Employee_Detail";

-- DropTable
DROP TABLE "Like_Status";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Post_Collection";

-- DropTable
DROP TABLE "Post_Type";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Show";

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" SERIAL NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_fullname" TEXT,
    "user_name" TEXT,
    "user_password" TEXT,
    "user_avatar" TEXT,
    "user_phone" TEXT,
    "user_email" TEXT NOT NULL,
    "user_role" "user_role" NOT NULL DEFAULT 'User',
    "user_is_block" BOOLEAN NOT NULL DEFAULT false,
    "user_refreshed_token" TEXT[],

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "post_title" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_content" TEXT,
    "post_thumbnail" TEXT,
    "post_slug" TEXT,
    "post_type_id" INTEGER NOT NULL,
    "post_views" INTEGER NOT NULL DEFAULT 0,
    "post_is_publish" BOOLEAN NOT NULL DEFAULT false,
    "post_is_draft" BOOLEAN NOT NULL DEFAULT true,
    "post_date" TIMESTAMP(3),
    "post_comment_count" INTEGER NOT NULL DEFAULT 0,
    "post_share_count" INTEGER NOT NULL DEFAULT 0,
    "post_score" INTEGER NOT NULL DEFAULT 0,
    "post_author_id" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_types" (
    "id" SERIAL NOT NULL,
    "post_type_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_type_priority" INTEGER NOT NULL DEFAULT 0,
    "post_type_icon" TEXT,

    CONSTRAINT "post_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feeling_status" (
    "id" SERIAL NOT NULL,
    "feeling_status_value" TEXT NOT NULL,
    "feeling_status_icon" TEXT NOT NULL,

    CONSTRAINT "feeling_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "comment_content" TEXT NOT NULL,
    "parent_id" INTEGER NOT NULL DEFAULT 0,
    "subcomment_count" INTEGER NOT NULL DEFAULT 0,
    "feeling_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_collections" (
    "id" SERIAL NOT NULL,
    "post_collection_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_count_saved" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "post_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_post_collections" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "post_collection_id" INTEGER NOT NULL,

    CONSTRAINT "posts_post_collections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_email_key" ON "user_profiles"("user_email");

-- CreateIndex
CREATE INDEX "user_profiles_created_at_idx" ON "user_profiles"("created_at");

-- CreateIndex
CREATE INDEX "user_profiles_user_is_block_idx" ON "user_profiles"("user_is_block");

-- CreateIndex
CREATE INDEX "user_profiles_user_role_idx" ON "user_profiles"("user_role");

-- CreateIndex
CREATE UNIQUE INDEX "posts_post_slug_key" ON "posts"("post_slug");

-- CreateIndex
CREATE INDEX "posts_post_author_id_idx" ON "posts"("post_author_id");

-- CreateIndex
CREATE INDEX "posts_created_at_idx" ON "posts"("created_at");

-- CreateIndex
CREATE INDEX "posts_updated_at_idx" ON "posts"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "post_types_post_type_name_key" ON "post_types"("post_type_name");

-- CreateIndex
CREATE UNIQUE INDEX "post_types_post_type_priority_key" ON "post_types"("post_type_priority");

-- CreateIndex
CREATE INDEX "post_types_created_at_idx" ON "post_types"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "feeling_status_feeling_status_value_key" ON "feeling_status"("feeling_status_value");

-- CreateIndex
CREATE INDEX "feeling_status_feeling_status_value_idx" ON "feeling_status"("feeling_status_value");

-- CreateIndex
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "comments_post_id_idx" ON "comments"("post_id");

-- CreateIndex
CREATE INDEX "comments_parent_id_idx" ON "comments"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_collections_post_collection_name_key" ON "post_collections"("post_collection_name");

-- CreateIndex
CREATE INDEX "post_collections_user_id_idx" ON "post_collections"("user_id");

-- CreateIndex
CREATE INDEX "post_collections_created_at_idx" ON "post_collections"("created_at");

-- CreateIndex
CREATE INDEX "posts_post_collections_post_id_idx" ON "posts_post_collections"("post_id");

-- CreateIndex
CREATE INDEX "posts_post_collections_post_collection_id_idx" ON "posts_post_collections"("post_collection_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_author_id_fkey" FOREIGN KEY ("post_author_id") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_post_type_id_fkey" FOREIGN KEY ("post_type_id") REFERENCES "post_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_collections" ADD CONSTRAINT "post_collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_post_collections" ADD CONSTRAINT "posts_post_collections_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_post_collections" ADD CONSTRAINT "posts_post_collections_post_collection_id_fkey" FOREIGN KEY ("post_collection_id") REFERENCES "post_collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
