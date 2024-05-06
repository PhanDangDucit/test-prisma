"use server"
import prisma from "@/prisma/client";
import { 
    CommentState,
    CreateComment,
    validatedComment
} from "@/validators/validate-comment";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

/**
 * 
 * @param formData 
 * @returns 
 */
export async function createNewComment(
    postId: number,
    userId:number,
    parentId: number,
    prevState: CommentState,
    formData: FormData
) {
    console.log("add comment");
    const validatedFields = validatedComment(CreateComment, formData);
    if (!validatedFields.success) {
        console.log("Error::", validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create comment',
        };
    }
    console.log("Submit new main comment!");
    // create time follow UTC time zone to save data for database
    const updatedAt = new Date();
    try {
        await prisma.post.update({
            where: {
                id: postId
            },
            data:{
                comment_count: {
                    increment: 1,
                },
            }
        })
        if(parentId === 0) {
            await prisma.comment.create({
                data: {
                    ...validatedFields.data,
                    user_id: userId,
                    like_count: 0,
                    post_id: postId,
                    updated_at: updatedAt
                }
            })
        } else {
            await prisma.comment.update({
                where: {
                    id: parentId,
                },
                data:{
                    subcomment_count: {
                        increment: 1,
                    },
                }
            })
            await prisma.comment.create({
                data: {
                    ...validatedFields.data,
                    user_id: userId,
                    like_count: 0,
                    post_id: postId,
                    updated_at: updatedAt,
                    parent_id: parentId
                }
            })
        }
        return prevState;
    } catch (error) {
        console.error("error::", error);
        return {
            message:`Create a comment failed:  + ${error}`
        }
    }
    
    // revalidatePath('/manage-blog/posts');
    // redirect('/manage-blog/posts');
}