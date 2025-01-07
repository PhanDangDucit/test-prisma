-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "post_is_free" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "creator_programs" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "csp_id" INTEGER NOT NULL,
    "post_posted_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cp_others" JSONB,
    "user_follower_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "creator_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creator_system_programs" (
    "id" SERIAL NOT NULL,
    "csp_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "csp_others" JSONB,
    "csp_is_published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "creator_system_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_followers" (
    "id" SERIAL NOT NULL,
    "publisher_id" INTEGER NOT NULL,
    "subscriber_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "payment_method" INTEGER NOT NULL,
    "received_account" INTEGER NOT NULL,
    "payment_others" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" SERIAL NOT NULL,
    "user_used_discount" TEXT[],
    "discount_name" INTEGER NOT NULL,
    "discount_others" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_users" (
    "id" SERIAL NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "usp_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "program_price_paied" numeric NOT NULL,
    "program_user_others" JSONB,

    CONSTRAINT "program_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_system_programs" (
    "id" SERIAL NOT NULL,
    "usp_name" TEXT NOT NULL,
    "usp_price" numeric NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "system_program_others" JSONB,
    "sp_is_published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_system_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "publisher_id" INTEGER NOT NULL,
    "subscriber_id" INTEGER NOT NULL,
    "notification_others" JSONB,
    "notification_viewed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "creator_programs_author_id_idx" ON "creator_programs"("author_id");

-- CreateIndex
CREATE INDEX "creator_programs_csp_id_idx" ON "creator_programs"("csp_id");

-- CreateIndex
CREATE INDEX "user_followers_created_at_idx" ON "user_followers"("created_at");

-- CreateIndex
CREATE INDEX "user_followers_publisher_id_idx" ON "user_followers"("publisher_id");

-- CreateIndex
CREATE INDEX "user_followers_subscriber_id_idx" ON "user_followers"("subscriber_id");

-- CreateIndex
CREATE INDEX "program_users_user_id_idx" ON "program_users"("user_id");

-- CreateIndex
CREATE INDEX "program_users_usp_id_idx" ON "program_users"("usp_id");

-- CreateIndex
CREATE INDEX "program_users_discount_id_idx" ON "program_users"("discount_id");

-- CreateIndex
CREATE INDEX "program_users_payment_id_idx" ON "program_users"("payment_id");

-- CreateIndex
CREATE INDEX "program_users_start_date_idx" ON "program_users"("start_date");

-- CreateIndex
CREATE INDEX "user_system_programs_created_at_idx" ON "user_system_programs"("created_at");

-- CreateIndex
CREATE INDEX "notifications_publisher_id_idx" ON "notifications"("publisher_id");

-- CreateIndex
CREATE INDEX "notifications_subscriber_id_idx" ON "notifications"("subscriber_id");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "notifications"("created_at");

-- AddForeignKey
ALTER TABLE "creator_programs" ADD CONSTRAINT "creator_programs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creator_programs" ADD CONSTRAINT "creator_programs_csp_id_fkey" FOREIGN KEY ("csp_id") REFERENCES "creator_system_programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_users" ADD CONSTRAINT "program_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_users" ADD CONSTRAINT "program_users_usp_id_fkey" FOREIGN KEY ("usp_id") REFERENCES "user_system_programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_users" ADD CONSTRAINT "program_users_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_users" ADD CONSTRAINT "program_users_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
