import { formartSlug } from "@/helpers/convert-language";
import { processSlice } from "@/utils/posts.util";
import { z } from "zod";

const FormSchema = z.object({
    id:z.string(),
    title:z.string().refine((val) => val.length >= 10, {
        message: "String  more than 10 characters",
    }),
    created_at:z.string(),
    content:z.string().refine((val) => val.length >= 150, {
        message: "String  more than 150 characters",
    }),
    slug: z.string(),
    post_type_id:z.string(),
    thumbnail:z.string(),
    updated_at:z.string(),
    post_status_id:z.number(),
});

export const CreatePost = FormSchema.omit({ 
    id: true,
    slug: true,
    post_status_id:true,
    updated_at: true,
    created_at: true,
});

export const UpdatePost = FormSchema.omit({ 
    id: true,
    slug: true,
    post_status_id:true,
    updated_at: true,
    created_at: true,
});

export type PostState = {
    errors?: {
        title?:string[],
        content?:string[],
        post_type_id?:string[],
        thumbnail?:string[]
    };
    message?: string | null;
}


/**
 * Validate slug
 * @param slug 
 * @param title 
 * @returns 
 */
export function validateSlug(slug:string, title:string) {
    const titleFormartAsSlug = formartSlug(title);
    const isContain = slug.includes(titleFormartAsSlug);
    if(!isContain) return false;
    const number = processSlice(slug, slug.length - 7, slug.length).trim();
    if(isNaN(Number(number)) && number.length != 7) return false;
    return true;
}

/**
 * Validate employee by zod
 * @param action 
 * @param formData
 * @returns 
 */
export function validatedPost(action: typeof CreatePost | typeof UpdatePost, formData: FormData) {
    return action.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        post_type_id: formData.get('post_type_id'),
        thumbnail: formData.get('thumbnail'),
        userID: formData.get('user-id'),
    });
}


