"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import {
    CreatePost,
    PostState,
    UpdatePost,
    validateSlug,
    validatedPost 
} from '@/validators/validate-post';
import { processSlugUnique, getPostIdBySlug } from "@/lib/data-post";
import { CreatePostCategory, PostCategoryState, validatedPostCategory } from "@/validators/validate-categories-post";
// import { insertDataInPostUser } from "@/lib/data-user";

/**
 * 
 * @param formData 
 * @returns 
 */
export async function createNewPost(userId:number, prevState:PostState, formData: FormData) {
    const validatedFields = validatedPost(CreatePost, formData);
    console.log('b1');
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Employee',
        };
    }

    // create time follow UTC time zone to save data for database
    const updatedAt = new Date();
    // const post_status_id = 1;
    const {
        post_type_id,
        title
    } = validatedFields.data;
    const slug = processSlugUnique(title);
    // const authorId = userId;
    // Handle logic with try catch block
    const isValid = validateSlug(slug, title);
    if(!isValid) {
        throw new Error("Slug is not valid!")
    }
    console.log('b2');
    try {
        await prisma.post.create({
            data: {
                ...validatedFields.data,
                updated_at: updatedAt,
                slug,
                author_id: userId,
                // post_status_id,
                post_type_id: Number(post_type_id)
            }
        })
        // console.log("result:  ", result);
        // console.log('b3');
        // const postId = await getPostIdBySlug(slug);
        // if(!postId) throw new Error("Get post id by slug is failed!");
        
        // await insertDataInPostUser(userId, postId);
        // const insertPostUser = await insertDataInPostUser(userId, postId);
    } catch (error) {
        return {
            message:`Create a post failed:  + ${error}`
        }
    }
    console.log('b4');
    revalidatePath('/manage-blog/posts');
    redirect('/manage-blog/posts');
}
/**
 * Update post
 * @param id 
 * @param formData 
 * @returns 
 */
export async function updatePost(slug:string, prevState: PostState, formData: FormData) {
    const validatedFields = validatedPost(UpdatePost, formData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Employee',
        };
    }
    // Get variables for create employee
    const updated_at = new Date();
    const {
        post_type_id
    } = validatedFields.data;
    // Handle logic with try catch block
    try {
        await prisma.post.update({
            where: {
              slug
            },
            data: {
                ...validatedFields.data,
                updated_at,
                post_type_id: Number(post_type_id)
            }
        })
    } catch (error) {
        throw new Error("Update a post failed: " + error);
    }
    revalidatePath('/manage-blog/posts');
    redirect('/manage-blog/posts');
}

/**
 * Delete post by id
 * @param id 
 */
export async function deletePost(id: number) {
    try {
        await prisma.post.delete({
            where: {
                id
            },
        })
        revalidatePath('/manage-blog/posts');
    } catch (error) {
        throw new Error("Delete a post failed: " + error);
    }
}

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

/**
 * update kind of post
 * @param id 
 * @param prevPostState 
 * @param formData 
 * @returns 
 */
export async function updatePostCategory(id: number, prevPostState:PostCategoryState, formData: FormData) {
    const validatedFields = validatedPostCategory(CreatePostCategory, formData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Employee',
        };
    }
    // create time follow UTC time zone to save data for database
    try {
        await prisma.post_Type.update({
            where: {
                id
            },
            data: {
                ...validatedFields.data
            }
        })
    } catch (error) {
        return {
            message:`Create a category for post is failed:  + ${error}`
        } 
    }
    revalidatePath('/manage-post/categories');
    redirect('/manage-post/categories');
}

/**
 * 
 * @param id 
 */
export async function deletePostCategory(id: number) {
    try {
        await prisma.post_Type.delete({
            where: {
                id
            },
        })
        revalidatePath('/manage-post');
    } catch (error) {
        throw new Error("Delete a post category failed: " + error);
    }
}

/**
 * Change status post
 * @param id 
 * @param isShow 
 * @param formData 
 * @returns
 */
export async function changeStatusPost(id: number, formData:FormData) {
    const isShow = formData.get('isShow');
    try {
        const status = await prisma.post.update({
            where: {
                id
            },
            data: {
                is_show: isShow === "Show" ? "Show" : "Hidden"
            }
        })
        revalidatePath('/manage-blog/categories');
        return status;
    } catch (error) {
        throw new Error("Delete a post category failed: " + error);
    }
}
