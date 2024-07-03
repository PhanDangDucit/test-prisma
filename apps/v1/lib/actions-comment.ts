"use server"
import { comment, post } from "@/configs/constants";
import { createClient } from "@/configs/supabase-server.config";
import { PostType, TComment, TCommentWithUser } from "@/helpers/definitions";
import { insertComment, updateCommentCount, updateSubCommentCount } from "@/utils/comment.util";
// import prisma from "@/prisma/client";
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
    const supabase = createClient();
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
            const datas = {
                ...validatedFields.data,
                user_id: userId,
                like_count: 0,
                post_id: postId,
                updated_at: updatedAt,
                subcomment_count: 0
            }

            // create a new main comment
            const result1 = await insertComment(datas)

            result.comment = result1;

            console.log("result create new main comment::", result1);

            // Update comment count of the post
            const result2 = await updateCommentCount(postId);

            result.post = result2;

            console.log("result update comment_count for post::", result2);
        } else {
            console.log("ParentId:", parentId);
            // create a new subcomment

            const datas = {
                ...validatedFields.data,
                user_id: userId,
                like_count: 0,
                post_id: postId,
                updated_at: updatedAt,
                parent_id: parentId
            }
            /**
             * Insert a new comment
             */
            const result3 = await insertComment(datas);
            result.comment = result3;
            
            console.log("result create new subcomment::", result3);

            /**
             * Update subcommentcount for main comment
             */
            const result4 = await updateSubCommentCount(parentId);

            console.log("result update subcomment_count for main comment::", result4);
            
            /**
             * update comment count for the post
             */
            const result5 = await updateCommentCount(postId);
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