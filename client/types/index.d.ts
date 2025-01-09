
import { ZodString } from "zod";

declare global {
    /**
     * @desc type of posts
     */
    type Posts = {
        id: number;
        title: string;
        created_at: string;
        updated_at: string;
        content: string;
        thumbnail: string;
        slug: string;
        type_id: string;
        views: string;
        is_publish: boolean;
        is_draft: boolean;
        date: string;
        comment_count: number;
        share_count: number;
        score: number;
        author_id: number;
        is_free: boolean;
    }

    type PostsList = Array<Posts>;

    /**
     * @desc type of categories
     */
    type Categories = {
        id: number,
        name_post_type: string,
        created_at: string,
        priority: number,
        icon: string,
    }

    type CategoriesList = Array<Categories>

    // Type of user
    type User = {
        id: number,
        fullname: string|null,
        username: string|null,
        password: string|null,
        avatar: string|null,
        created_at: Date|null,
        updated_at: Date|null,
        phone: number|null,
        email: string,
        role: number|null
    }

    // type of posts
    type PostType = {
        id:number;
        title:string;
        created_at:Date;
        updated_at:Date;
        content:string;
        thumbnail:string|null;
        post_type_id:number;
        slug:string;
        is_show: string,
        author_id: number,
        comment_count:number
    }
}

export type FormSchemaEmployeeType = {
    id: ZodString;
    first_name: ZodString;
    last_name: ZodString;
    image_url: ZodString;
    phone: ZodString;
    department_id: ZodString;
    email: ZodString;
}

export type StatusPost = {
    id: number,
    value: string
}

export type MultiRangeSliderProps = {
    min: number;
    max: number;
}

export type SearchQuery = {
    q: string,
    category:string,
    page: number,
}

export type TComment = {
    id: number,
    content: string,
    user_id: number,//
    like_count: number,
    post_id: number,
    parent_id: number|null,
    created_at: Date,
    updated_at: Date,//
    subcomment_count: number
}

export type TCommentWithUser = {
    id: number,
    content: string,
    like_count: number,
    post_id: number,
    parent_id: number|null,
    created_at: Date,
    subcomment_count: number,
    user: {
        avatar: string|null,
        username: string|null
    }
}
export type PostCategoriesType = {
    id: number,
    name_post_type: string,
    created_at: Date|null,
    priority: number,
    icon: string|null,
}
