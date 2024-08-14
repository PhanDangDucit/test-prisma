
CREATE TYPE user_role AS ENUM ('admin', 'users', 'author');

-- CreateTable
CREATE TABLE "user_profiles" (
    id uuid not null references auth.users on delete cascade,
    fullname VARCHAR(255),
    user_avatar VARCHAR(255),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL,
    user_phone INTEGER,
    user_role INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "post_author_id" uuid not null references public."users" on delete cascade,
    "post_title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "post_content" TEXT NOT NULL,
    "post_thumbnail" TEXT NOT NULL,
    "post_slug" TEXT Not NULL,
    "post_views" INTEGER DEFAULT 0,
    "post_is_show" INTEGER default 0,
    "post_type_id" INTEGER NOT NULL,
    "post_comment_count" INTEGER default 0,
    "post_is_draft" BOOLEAN default true,
    "post_is_publish" BOOLEAN default false,
    "post_share_count" INTEGER default 0,
    "post_score" INTEGER default 0,
    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_types" (
    "id" SERIAL NOT NULL,
    "post_type_name" TEXT NOT NULL,
    "post_type_priority" INTEGER UNIQUE NOT NULL,
    "post_type_thumbnail" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "post_types_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "user_id" uuid not null references public."User_Profile" on delete cascade,
    "post_id" INTEGER NOT NULL,
    "parent_id" INTEGER DEFAULT 0,
    "comment_content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "feeling_count" INTEGER DEFAULT 0,
    "subcomment_count" INTEGER DEFAULT 0,
    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "feeling_status" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER Not Null,
    "user_id" uuid not null references public."User_Profile" on delete cascade,
    "value" text not null,
    "icon" Text not null,
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

# index
create index id_user_profile_index on public."User_Profile"(id);
create index id_post_index on public."Post"(id);
create index id_post_type_index on public."Post"(id);

# Security
alter table public."User_Profile" enable row level security;