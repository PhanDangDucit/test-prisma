import { ZodString } from "zod"

export type EmployeeType = {
    id: number,
    first_name: string,
    last_name:string,
    email:string,
    phone:string,
    created_at:Date,
    updated_at: Date,
    image_url:string
    department_id: number
}

export type DepartmentType = {
    id: number,
    department_name:string
}

export type CreateEmployeeType =  {
    email?: string,
    first_name?: string,
    last_name?: string,
    phone?: string,
    department_id?: string
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

export type PostType = {
    id:number;
    title:string;
    created_at:Date;
    updated_at:Date;
    content:string;
    thumbnail:string|null;
    // post_status_id:number;
    post_type_id:number;
    slug:string;
    is_show: string,
    author_id: number,
    comment_count:number
}

export type PostCategoriesType = {
    id: number,
    name_post_type: string,
    created_at: Date|null,
    priority: number,
    icon: string|null,
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
    subcomment_count: number|null
}

export type TCommentWithUser = {
    id: number,
    content: string,
    like_count: number,
    post_id: number,
    parent_id: number|null,
    created_at: Date,
    subcomment_count: number|null,
    user: {
        avatar: string|null,
        username: string|null
    }
}