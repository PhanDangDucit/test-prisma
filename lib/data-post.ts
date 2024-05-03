// import { PostType } from "@/helpers/definitions";
import prisma from "@/prisma/client";
import { unstable_noStore as noCache } from 'next/cache';
// import moment from 'moment';
import { formartSlug } from "@/helpers/convert-language";

/**
 * Fetch all Post
 * @returns 
 */
export async function fetchAllPosts() {
    noCache();
    try {
        const allPosts = await prisma.post.findMany();
        await prisma.$disconnect();
        return allPosts;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get all post failed! " + error);
    }
}

/**
 * 
 * @param slug 
 * @returns 
 */
export async function fetchPostBySlug(slug:string) {
    noCache();
    slug = decodeURIComponent(slug);
    try {
        const post = await prisma.post.findFirst({
            where: {
                slug
            },
        })
        // await prisma.$disconnect();
        return post;
    } catch (error) {
        // await prisma.$disconnect();
        throw new Error("Get one post failed!");
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
export async function getLatestOnePostForEachPostType(post_type_id: number) {
    noCache();
    try {
        const post = await prisma.post.findFirst({
            where: {
                post_type_id,
            },
            orderBy: {
                created_at: 'desc'
            },
        })
        await prisma.$disconnect();
        return post;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get one post failed!");
    }
}

/**
 * 
 * @param post_type_id 
 * @returns 
 */

export async function fetchLatestPostsForPostType(post_type_id: number, limit: number) {
    noCache();
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
        await prisma.$disconnect();
        return post;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get one post failed!");
    }
}

/**
 * 
 * @param post_type_id
 * @returns 
 */
export async function fetchManyViewsEachPost(post_type_id: number, quantity: number) {
    noCache();
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
        await prisma.$disconnect();
        return posts;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get post that has the best views is failed!");
    }
}

/**
 * Get all post categories
 * @returns 
 */
export async function fetchAllPostCategories() {
    try {
        const allPostsCategories = await prisma.post_Type.findMany();
        await prisma.$disconnect();
        return allPostsCategories;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get all employees failed! " + error);
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
        await prisma.$disconnect();
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Update image url faild! " + error);
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
        throw new Error("Get image url faild! " + error);
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
        throw new Error("Get image url faild! " + error);
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export async function fetchNewPostRelated(id: number) {
    try {
        const posts = await fetchLatestPostsForPostType(id, 2);
        await prisma.$disconnect();
        return posts;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get post related is failed! " + error);
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
        throw new Error("Get many view post is failed! " + error);
    }
}

/**
 * Fetch many view posts
 * @returns 
 */
export async function fetchCategoriesIdByTypeName(name_post_type:string) {
    noCache();
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
        throw new Error("Get many view post is failed! " + error);
    }
}

/**
 * Get all status of post
 * @returns 
 */
// export async function getAllStatus() {
//     try {
//         const status = await prisma.post_Status.findMany();
//         await prisma.$disconnect();
//         return status;
//     } catch (error) {
//         await prisma.$disconnect();
//         throw new Error("Get all status of post is failed! " + error);
//     }
// }

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
        throw new Error("Get all status of post is failed! " + error);
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
        throw new Error("Get post id by slug is failed! " + error);
    }
}