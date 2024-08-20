import { ZodString } from "zod"

declare global {
    type TPost = {
        id:string;
        title:string;
        created_at:Date;
        updated_at:Date;
        content:string;
        thumbnail:string|null;
        post_type_id:number;
        slug:string;
        is_show: string,
        author_id: string,
        comment_count:number
    }

    type TCategory = {
        id: string,
        name_post_type: string,
        created_at: Date|null,
        priority: number,
        icon: string|null,
    }
    
    type TCategoryList = Array<TCategory>

    type TUserProfile = {
        id: string,
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

    type TComment = {
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

    type TCommentWithUser = {
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

export namespace Supabase {
    /**
     * Type for Supabase environment variables
     */
    export type TSUPABASE_ENV = {
        url: string,
        "anon-key": string
    }
}
