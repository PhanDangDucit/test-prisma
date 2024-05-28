import { Supabase } from "@/helpers/definitions";


/**
 * Node environment
 */

export const hosting = process.env.NEXT_PUBLIC_DEV_HOST_URL! ?? process.env.NEXT_PUBLIC_PRODUCTION_HOST_URL ;

/**
 * SUPABASE_ENV variable is used for configure client of "supabase"
 */
export const SUPABASE_ENV:Supabase.TSUPABASE_ENV = {
    url:process.env.NEXT_PUBLIC_SUPABASE_URL!,
    "anon-key":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
}


/**
 * Constants for useFormState:
 *  - initialState
 *  - user
 *  - comment
 *  - post
 */
export const initialState = { message: null || "", errors: {} };

export const user = {
    id: 0,
    fullname: null,
    username: null,
    password: null,
    avatar: null,
    created_at: null,
    updated_at: null,
    phone: null,
    email: '',
    role: null
}

export const comment = {
    id: 0,
    content: '',
    user_id: 0,
    like_count: 0,
    post_id: 0,
    parent_id: 0,
    created_at: new Date(),
    updated_at: new Date(),
    subcomment_count: 0
}

export const post = {
    id:0,
    title:'',
    created_at:new Date(),
    updated_at:new Date(),
    content:'',
    thumbnail:'',
    post_type_id:0,
    slug:'',
    is_show: '',
    author_id: 0,
    comment_count: 0
}