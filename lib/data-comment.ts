import { TComment } from "@/helpers/definitions";
import prisma from "@/prisma/client";

/**
 * Get all comment of a post by postId
 * @param postId
 * @returns
 */
export async function getAllMainComments(postId: number): Promise<TComment[]> {
    try {
        const allComments = await prisma.comment.findMany({
            where: {
                AND: {
                    post_id: postId,
                    parent_id: null
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
export async function getAllSubcommentsOfOneComment(commentId: number): Promise<TComment[]>{
    try {
        const allComments = await prisma.comment.findMany({
            where: {
                id: commentId
            }
        });
        await prisma.$disconnect();
        return allComments;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get all post failed! " + error);
    }
}