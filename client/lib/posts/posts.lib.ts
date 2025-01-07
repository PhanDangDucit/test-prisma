import prisma from "@/prisma/client";
import { formartSlug } from "@/helpers/convert-language";

/**
 * @desc get all posts
 * @returns 
 */
export const getAllPosts = async (offset: string = "0", limit: string = "5") => {
    return await prisma.post.findMany({
        skip: Number(offset),
        take: Number(limit),
    })
}

/**
 * Fetch all Post
 * @returns 
 */
export async function fetchAllPosts() {
    try {
        return await prisma.post.findMany() ?? [];
    } catch (error) {
        console.log("Get all post failed! ");
    }
}

/**
 * 
 * @param slug 
 * @returns 
 */
export async function fetchPostBySlug(slug:string) {
    slug = decodeURIComponent(slug);
    try {
        const post = await prisma.post.findFirst({
            where: {
                slug
            },
        })
        return post;
    } catch (error) {
        console.log("Get one post failed!");
    }
}

/**
 * 
 * @param title 
 * @returns 
 */
export function processSlugUnique(title: string) {
    const titleFormat = formartSlug(title);
    const slug = (titleFormat + '-' + Math.round(Math.random() * 1000000 + 1000000)).toLowerCase();
    return slug;
}

/**
 * Fetch latest tech post
 * @param post_type_id
 * @returns
 */
export async function getPostByCategoryId(post_type_id: number) {
    try {
        const post = await prisma.post.findFirst({
            where: {
                post_type_id,
            },
            orderBy: {
                created_at: 'desc'
            },
        })
        return post;
    } catch (error) {
        console.log("Get one post failed!");
    }
}

/**
 * 
 * @param post_type_id 
 * @returns 
 */

export async function fetchLatestPostsForPostType(post_type_id: number, limit: number) {
    try {
        const post = await prisma.post.findMany({
            take: limit,
            where: {
                post_type_id,
            },
            orderBy: {
                created_at: 'desc'
            },
        })

        if(post) return post;
        return []
    } catch (error) {
        console.log("Get related posts failed!");
    }
}

/**
 * 
 * @param post_type_id
 * @returns 
 */
export async function fetchManyViewsEachPost(post_type_id: number, quantity: number) {
    try {
        const posts = await prisma.post.findMany({
            take: quantity,
            where: {
                post_type_id
            },
            orderBy: {
                views: 'desc'
            },
        })
        return posts;
    } catch (error) {
        console.log("Get post that has the best views is failed!");
    }
}


/**
 * 
 * @param title 
 * @param thumbnail 
 */
export async function updatePostThumbnail(slug:string, thumbnail:string) {
    try {
        await prisma.post.update({
            where: {
                slug
            },
            data: {
              thumbnail,
            },
        })
    } catch (error) {
        console.log("Update image url faild! ");
    }
}

/**
 * Get category
 * @param id 
 * @returns 
 */
export async function fetchPostCategoryById(id: number) {
    try {
        const category =  await prisma.post_Type.findUnique({
            where: {
                id,
            }
        })
        await prisma.$disconnect();
        return category?.name_post_type;
    } catch (error) {
        await prisma.$disconnect();
        console.log("Get image url faild! " + error);
    }
}

/**
 * Fetch thumbnail from one post that is newly created
 * @param title 
 * @returns 
 */
export async function fetchThumbnail(title: string) {
    try {
        const thumbnail = await prisma.post.findFirst({
            where: {
                title
            },
            select: {
                thumbnail:true
            }
        })
        await prisma.$disconnect();
        return thumbnail
    } catch (error) {
        await prisma.$disconnect();
        console.log("Get image url fail! " + error);
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export async function fetchNewPostRelated(id: number) {
    try {
        return await fetchLatestPostsForPostType(id, 2);
    } catch (error) {
        console.log("Get post related is failed! " + error);
    }
}

/**
 * Fetch many view posts
 * @returns 
 */
export async function fetchManyViewsPosts(quantity:number) {
    try {
        const posts = await prisma.post.findMany({
            take: quantity,
            orderBy: {
                views: 'desc'
            }
        })
        await prisma.$disconnect();
        return posts;
    } catch (error) {
        await prisma.$disconnect();
        console.log("Get many view post is failed! " + error);
    }
}

/**
 * Fetch many view posts
 * @returns 
 */
export async function fetchCategoriesIdByTypeName(name_post_type:string) {
    try {
        const posts = await prisma.post_Type.findFirst({
            where: {
                name_post_type
            },
            select: {
                id:true
            }
        })
        await prisma.$disconnect();
        return posts;
    } catch (error) {
        await prisma.$disconnect();
        console.log("Get many view post is failed! " + error);
    }
}


export async function getRangeView() {
    try {
        const maxViewAgg = await prisma.post.aggregate({
            _max: {
                views:true
            }
        });
        const minViewAgg = await prisma.post.aggregate({
            _min: {
                views:true
            }
        });
        await prisma.$disconnect();
        const result = {
            maxViews: maxViewAgg._max.views,
            minViews: minViewAgg._min.views
        }
        return result;
    } catch (error) {
        await prisma.$disconnect();
        console.log("get Range View! " + error);
        return {
            maxViews: 0,
            minViews: 0

        }
    }
}

/**
 * Get post id by slug
 * @param slug
 * @returns
 */
export async function getPostIdBySlug(slug: string) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug
            },
            select: {
                id: true
            }
        })
        return post?.id;
    } catch (error) {
        await prisma.$disconnect();
        console.log("Get post id by slug is failed! " + error);
    }
}