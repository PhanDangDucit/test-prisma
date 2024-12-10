"use server"

import { 
    CreatePostCategory, 
    PostCategoryState, 
    validatedPostCategory 
} from "@/validators/validate-categories-post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";

/**
 * 
 * @param formData 
 * @returns 
 */
export async function createCategoryPost(prevPostState:PostCategoryState, formData: FormData) {
    const validatedFields = validatedPostCategory(CreatePostCategory, formData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Employee',
        };
    }

    // create time follow UTC time zone to save data for database
    const created_at = new Date();
    try {
        await prisma.post_Type.create({
            data: {
                ...validatedFields.data,
                created_at
            }
        })
    } catch (error) {
        return {
            message:`Create a category for post is failed:  + ${error}`
        } 
    }
    revalidatePath('/manage-blog/categories');
    redirect('/manage-blog/categories');
}