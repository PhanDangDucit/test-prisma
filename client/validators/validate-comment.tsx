import { TComment } from "@/types";
import { z } from "zod";

const FormSchema = z.object({
    id:z.string(),
    created_at:z.string(),
    updated_at:z.string(),
    content:z.string().refine((val) => val.length >= 1, {
        message: "comment is empty!",
    }),
    likeId: z.number(),
    userId: z.number(),
    postId:z.number(),
    parentId:z.number(),
    likeCount:z.number(),
});

export const CreateComment = FormSchema.omit({ 
    id: true,
    updated_at: true,
    created_at: true,
    likeId: true,
    userId: true,
    postId:true,
    parentId:true,
    likeCount:true
});

export const UpdateComment = FormSchema.omit({ 
    id: true,
    updated_at: true,
    created_at: true,
    likeId: true,
    userId: true,
    postId:true,
    parentId:true,
    likeCount:true
});

export type CommentState = {
    errors?: {
        content?: string[]
    };
    message?: string | null;
    data?: {
        comment?: TComment|null;
        post?: PostType|null;
    }
}

export type CommentStateAvailability = {
    data: {
        comment: TComment;
        post: PostType;
    }
}


/**
 * Validate employee by zod
 * @param action 
 * @param formData
 * @returns 
 */
export function validatedComment(action: typeof CreateComment | typeof UpdateComment, formData: FormData) {
    return action.safeParse({
        content: formData.get('content')
    });
}


