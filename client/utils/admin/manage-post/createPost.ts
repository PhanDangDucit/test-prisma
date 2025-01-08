import { processSlugUnique } from "@/lib/posts/posts.lib";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

export const createPost = async ({
    title,
    content,
    thumbnail,
    email,
    userId,
    // categoryId,
    name_post_type
}: {
    title: string,
    email: string,
    // categoryId: string,
    content: string,
    thumbnail: string,
    userId: number,
    name_post_type: string
}) => {

    const updatedAt = new Date();
    const slug = processSlugUnique(title);
    
    await prisma.post.create({
        data: {
            title,
            updated_at: updatedAt,
            slug,
            thumbnail,
            content,
            post_type: {
                connect: {
                    name_post_type
                }
            },
            user: {
                connect: {
                    email
                }
            }
        },
    })
}