
import { ZodString } from "zod";

declare global {
    /**
     * @desc type of posts
     */
    type Posts = {
        id: number;
        post_title: string;
        created_at: string;
        updated_at: string;
        post_content: string;
        post_thumbnail: string;
        post_slug: string;
        post_type_id: string;
        post_views: string;
        post_is_publish: boolean;
        post_is_draft: boolean;
        post_date: string;
        post_comment_count: number;
        post_share_count: number;
        post_score: number;
        post_author_id: number;
        post_is_free: boolean;
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




export type User = {
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
    status: string
    category:string,
    page: number,
    'to-date':Date,
    'from-date':Date,
    'max-view':string,
    'min-view':string,
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