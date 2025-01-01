-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image_url" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,
    "manager_id" SERIAL NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee_Detail" (
    "id" SERIAL NOT NULL,
    "position" VARCHAR(30) NOT NULL,
    "cccd" VARCHAR(30) NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "salary" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "Employee_Detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "department_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(255),
    "username" VARCHAR(255),
    "password" VARCHAR(50),
    "avatar" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "phone" INTEGER,
    "email" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 0,

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
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "thumnail" VARCHAR(255) NOT NULL,
    "post_status_id" INTEGER NOT NULL,
    "post_type_id" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_User" (
    "id" SERIAL NOT NULL,
    "isFavorite" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "post_role_id" INTEGER NOT NULL,

    CONSTRAINT "Post_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_Role" (
    "id" TEXT NOT NULL,
    "value" VARCHAR(30) NOT NULL,

    CONSTRAINT "Post_Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_Status" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(30) NOT NULL,

    CONSTRAINT "Post_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post_Type" (
    "id" SERIAL NOT NULL,
    "name_post_type" VARCHAR(30) NOT NULL,

    CONSTRAINT "Post_Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Detail_employee_id_key" ON "Employee_Detail"("employee_id");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Detail" ADD CONSTRAINT "Employee_Detail_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_post_status_id_fkey" FOREIGN KEY ("post_status_id") REFERENCES "Post_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_post_type_id_fkey" FOREIGN KEY ("post_type_id") REFERENCES "Post_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_User" ADD CONSTRAINT "Post_User_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_User" ADD CONSTRAINT "Post_User_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
