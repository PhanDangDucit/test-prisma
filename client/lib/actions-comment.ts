"use server"
import { comment, post } from "@/configs/constants";
import prisma from "@/prisma/client";
import { TComment } from "@/types";
import { 
    CommentState,
    CreateComment,
    validatedComment
} from "@/validators/validate-comment";

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
            data: {
                comment: null,
                post: null
            }
        };
    }
    console.log("Submit new main comment!");
    // create time follow UTC time zone to save data for database
    const updatedAt = new Date();
    const result : {
        comment:TComment,
        post:PostType
    } = {
        comment,
        post
    };
    try {
        if(parentId === 0) {
            // create a new main comment
            const result1 = await prisma.comment.create({
                data: {
                    ...validatedFields.data,
                    user_id: userId,
                    like_count: 0,
                    post_id: postId,
                    updated_at: updatedAt,
                    subcomment_count: 0
                }
            })
            result.comment = result1;
            console.log("result create new main comment::", result1);
            const result2 = await prisma.post.update({
                where: {
                    id: postId
                },
                data:{
                    comment_count: {
                        increment: 1,
                    },
                }
            })
            result.post = result2;
            console.log("result update comment_count for post::", result2);
        } else {
            console.log("ParentId:", parentId);
            // create a new subcomment
            const result3 = await prisma.comment.create({
                data: {
                    ...validatedFields.data,
                    user_id: userId,
                    like_count: 0,
                    post_id: postId,
                    updated_at: updatedAt,
                    parent_id: parentId
                }
            })
            result.comment = result3;
            console.log("result create new subcomment::", result3);
            const result4 = await prisma.comment.update({
                where: {
                    id: parentId,
                },
                data:{
                    subcomment_count: {
                        increment: 1,
                    },
                }
            })
            console.log("result update subcomment_count for main comment::", result4);
            const result5 = await prisma.post.update({
                where: {
                    id: postId
                },
                data:{
                    comment_count: {
                        increment: 1,
                    },
                }
            })
            result.post = result5;
            console.log("result update comment_count for post::", result5);
        }
        // console.log("result::---> ", result)
        return { ...prevState, data:{...result}};
    } catch (error) {
        console.error("error::", error);
        // return {
        //     message:`Create a comment failed:  + ${error}`
        // }
        return prevState;
    }
    
    // revalidatePath('/manage-blog/posts');
    // redirect('/manage-blog/posts');
}