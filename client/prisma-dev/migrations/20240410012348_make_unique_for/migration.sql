/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Post_Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `Post_Status` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[priority]` on the table `Post_Type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_Role_value_key" ON "Post_Role"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Post_Status_value_key" ON "Post_Status"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Post_Type_priority_key" ON "Post_Type"("priority");
