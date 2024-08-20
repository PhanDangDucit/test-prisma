

/*
    Defined user_role with enum type to user_profiles (a seft-defined table) in "public" schema

*/
CREATE TYPE public.user_role AS ENUM ('admin', 'users', 'author');

-- CreateTable
CREATE TABLE "user_profiles" (
    id uuid not null references auth.users on delete cascade,
    fullname VARCHAR(255),
    user_avatar VARCHAR(255),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL,
    user_phone INTEGER,
    user_role user_role NOT NULL DEFAULT "users",
    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

/*
    posts table
*/
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
    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

/*
    post_types table
*/
CREATE TABLE "post_types" (
    "id" SERIAL NOT NULL,
    "post_type_name" TEXT NOT NULL,
    "post_type_priority" INTEGER UNIQUE NOT NULL,
    "post_type_thumbnail" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "post_types_pkey" PRIMARY KEY ("id")
);

/*
    comments table
*/
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

/*
    feeling_records table
*/
CREATE TABLE "feeling_records" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER Not Null,
    "user_id" uuid not null references public."user_profiles" on delete cascade,
    "feeling_status_id" int not null,
    CONSTRAINT "feeling_records_pkey" PRIMARY KEY ("id")
);

/*
    feel_status 
*/
CREATE TYPE feel_status AS ENUM ('dry', 'like', 'love', 'haha', 'wonder', 'none');

CREATE table "feeling_status" (
    id SERIAL NOT NULL,
    feeling_status_value feel_status DEFAULT "none",
    CONSTRAINT "feeling_status_pkey" PRIMARY KEY ("id")
);

/*
    post_collections table
*/

Create table post_collections (
    id SERIAL NOT NULL,
    user_id uuid NOT NULL,
    post_collection_name TEXT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    posts jsonb,
    CONSTRAINT "post_collections_pkey" PRIMARY KEY ("id")
);

/*
    storage_media table
*/
create table storage_media (
    id SERIAL NOT NULL,
    owner_id int,
    object_id int, -- id of records in others tables
    table_object_type, -- name of others tables
    metadata jsonb,
    CONSTRAINT "storage_media_pkey" PRIMARY KEY ("id")
);

/*
    Add ForeignKey
*/
-- posts and post_types
ALTER TABLE public."posts" ADD CONSTRAINT "posts_post_type_id_fkey" FOREIGN KEY ("post_type_id")
    REFERENCES public."post_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Post and user_profiles
ALTER TABLE public."posts" ADD CONSTRAINT "posts_user_profiles_id_fkey"  FOREIGN KEY ("post_author_id") 
    REFERENCES public."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Comment and User_Profile
ALTER TABLE public."comments" ADD CONSTRAINT "comments_user_profiles_id_fkey" FOREIGN KEY ("user_id") 
    REFERENCES public."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Comment and Post
ALTER TABLE public."comments" ADD CONSTRAINT "comments_posts_id_fkey" FOREIGN KEY ("post_id") 
    REFERENCES public."posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Feeling_Records and Comment
ALTER TABLE public."feeling_records" ADD CONSTRAINT "comments_feeling_records_id_fkey" FOREIGN KEY ("comment_id")
    REFERENCES public."comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Feeling_Records and User_profile
ALTER TABLE public."feeling_records" ADD CONSTRAINT "feeling_records_user_profiles_id_fkey" FOREIGN KEY ("user_id") 
    REFERENCES public."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Feeling_Records and Feeling_status
ALTER TABLE public."feeling_records" ADD CONSTRAINT "feeling_records_user_profiles_id_fkey" FOREIGN KEY ("feeling_status_id") 
    REFERENCES public."feeling_sttaus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Post_collections and User_profile
ALTER TABLE public."post_collections" ADD CONSTRAINT "post_collections_user_profiles_id_fkey" FOREIGN KEY ("user_id") 
    REFERENCES public."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
    index
*/
-- comments
create index comments_id_index on public."comments"(id);
create index comments_user_id_index on public."comments"(user_id);
create index comemnts_post_id_index on public."comments"(post_id);
create index comments_parent_id_index on public."comments"(parent_id);

-- feeling_records
create index feeling_records_id_index on public."feeling_records"(id);
create index feeling_records_comment_id_index on public."feeling_records"(comment_id);
create index feeling_records_user_id_index on public."feeling_records"(user_id);
create index feeling_records_feeling_status_id_index on public."feeling_records"(feeling_status_id);

-- feeling_status
create index feeling_status_id_index on public."feeling_status"(id);

-- user_profiles
create index user_profiles_id_index on public."user_profiles"(id);

-- posts
create index posts_id_index on public."posts"(id);
create index posts_post_author_id_index on public."posts"(post_author_id);
create index posts_post_type_id_index on public."posts"(post_type_id);

-- post_types
create index post_types_id_index on public."post_types"(id);

-- storage_media
create index storage_media_id_index on public."storage_media"(id);
create index storage_media_owner_id_index on public."storage_media"(owner_id);
create index storage_media_object_id_index on public."storage_media"(object_id);
create index storage_media_table_object_type_index on public."storage_media"(table_object_type);