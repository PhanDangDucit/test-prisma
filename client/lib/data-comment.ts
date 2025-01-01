import prisma from "@/prisma/client";
import { TCommentWithUser } from "@/types";

/**
 * Get all comment of a post by postId
 * @param postId
 * @returns
 */
export async function getAllMainComments(postId: number): Promise<TCommentWithUser[]> {
    try {
        const allComments = await prisma.comment.findMany({
            where: {
                AND: {
                    post_id: postId,
                    parent_id: null
                },
            },
            select: {
                id: true,
                content:true,
                like_count: true,
                post_id: true,
                parent_id: true,
                created_at: true,
                subcomment_count:true,
                user: {
                    select: {
                        avatar: true,
                        username:true
                    }
                }
            }
        });
        await prisma.$disconnect();
        return allComments;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get all post failed! " + error);
    }
}

/**
 * get all subcomments of one comment
 * @param commentId
 * @returns 
 */
export async function getAllSubcommentsOfOneComment(parentId: number): Promise<TCommentWithUser[]>{
    try {
        const allComments = await prisma.comment.findMany({
            where: {
                parent_id: parentId
            },
            select: {
                id: true,
                content:true,
                like_count: true,
                post_id: true,
                parent_id: true,
                created_at: true,
                subcomment_count:true,
                user: {
                    select: {
                        avatar: true,
                        username:true
                    }
                }
            }
        });
        await prisma.$disconnect();
        return allComments;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get all post failed! " + error);
    }
}