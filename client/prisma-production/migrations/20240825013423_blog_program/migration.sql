/*
  Warnings:

  - You are about to alter the column `program_price_paied` on the `program_users` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Unsupported("numeric")`.
  - You are about to alter the column `usp_price` on the `user_system_programs` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Unsupported("numeric")`.

*/
-- AlterTable
ALTER TABLE "program_users" ALTER COLUMN "program_price_paied" SET DATA TYPE numeric;

-- AlterTable
ALTER TABLE "user_system_programs" ALTER COLUMN "usp_price" SET DATA TYPE numeric;
