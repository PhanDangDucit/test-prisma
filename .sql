
-- CreateTable
CREATE TABLE "User_Profile" (
    "id" uuid not null references auth.users on delete cascade,
    "fullname" VARCHAR(255),
    "avatar" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "phone" INTEGER,
    "role" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "User_profile_pkey" PRIMARY KEY ("id")
);
alter table public."User_Profile" enable row level security;
create index id_user_profile_index on public."User_Profile"(id);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "user_id" uuid not null references public."User_Profile" on delete cascade,
    "title" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(150) Not NULL,
    "view" INTEGER DEFAULT 0,
    "is_show" INTEGER default 0,
    "post_type_id" INTEGER NOT NULL,
    "comment_count" INTEGER default 0,
    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
create index id_post_index on public."Post"(id);

-- CreateTable
CREATE TABLE "Post_Type" (
    "id" SERIAL NOT NULL,
    "name_post_type" VARCHAR(30) NOT NULL,
    "priority" INTEGER UNIQUE NOT NULL,
    "icon" VARCHAR(250),
    CONSTRAINT "Post_Type_pkey" PRIMARY KEY ("id")
);
create index id_post_type_index on public."Post"(id);

CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "user_id" uuid not null references public."User_Profile" on delete cascade,
    "post_id" INTEGER NOT NULL,
    "parent_id" INTEGER DEFAULT 0,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "like_count" INTEGER DEFAULT 0,
    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Like_Status" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER Not Null,
    "user_id" uuid not null references public."User_Profile" on delete cascade,
    "value" VARCHAR(30),
    "icon" VARCHAR(255),
    CONSTRAINT "Like_Statsu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey

    -- Post and Post_type
ALTER TABLE "Post" ADD CONSTRAINT "Post_post_type_id_fkey" FOREIGN KEY ("post_type_id")
    REFERENCES "Post_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

--     -- Post and User_Profile
ALTER TABLE "Post" ADD CONSTRAINT "Post_User_profile_id_fkey"  FOREIGN KEY ("user_id") 
    REFERENCES "User_Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

--     -- Comment and User_Profile
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_User_profile_id_fkey" FOREIGN KEY ("user_id") 
    REFERENCES "User_Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

--     -- Comment and Post
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") 
    REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

--     -- Like_Status and Comment
ALTER TABLE "Like_Status" ADD CONSTRAINT "Post_post_type_id_fkey" FOREIGN KEY ("comment_id")
    REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

--     -- Like_status and User_profile
ALTER TABLE "Like_Status" ADD CONSTRAINT "Like_status_User_profile_id_fkey" FOREIGN KEY ("user_id") 
    REFERENCES "User_Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;