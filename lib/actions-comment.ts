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
    const validatedFields = validatedComment(CreateComment, formData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create comment',
        };
    }
    // create time follow UTC time zone to save data for database
    const updatedAt = new Date();
    try {
        await prisma.comment.create({
            data: {
                ...validatedFields.data,
                user_id: userId,
                like_count: 0,
                post_id: postId,
                parent_id: parentId,
                updated_at: updatedAt
            }
        })
        return prevState;
    } catch (error) {
        return {
            message:`Create a comment failed:  + ${error}`
        }
    }
    
    // revalidatePath('/manage-blog/posts');
    // redirect('/manage-blog/posts');
}