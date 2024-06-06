// import { PostType } from "@/helpers/definitions";
import { unstable_noStore as noCache } from 'next/cache';
// import moment from 'moment';
import { formartSlug } from "@/helpers/convert-language";
import { FindSuzuSupabase } from '../libs/suzu-supabase-find';
import { PostType } from '@/helpers/definitions';
import { createClient } from '@/configs/supabase-server.config';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

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

export async function getOnePost<T>(post_type_id: number):Promise<Array<T> | null> {
    noCache();
    try {
        const supabase = createClient();
        const {data}:PostgrestSingleResponse<Array<T>> = await supabase
            .from('Post')
            .select("*")
            .order('id', {
                ascending: false
            })
            .limit(1)
            .eq("post_type_id", post_type_id)
        return data;
    } catch (error) {
        throw new Error("Get one post failed!");
    }
}



/**
 * 
 * @param post_type_id 
 * @returns 
 */

/**
 * 
 * @param post_type_id
 * @returns
 */
export async function getManyPost<T>(
    post_type_id: number,
    limit: number,
    col: string
): Promise<Array<T> | null>{
    noCache();
    const supabase = createClient();
    try {
        const {data}:PostgrestSingleResponse<Array<T>> = await supabase
            .from('Post')
            .select("*")
            .order(`${col}`, {
                ascending: false
            })
            .limit(limit)
            .eq("post_type_id", post_type_id)
        return data;
    } catch (error) {
        throw new Error(`Get many post with ${col} is failed!`);
    }
}

/**
 * Get all post categories
 * @returns 
 */


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
export async function fetchOnePost<T>(col: string, val: number|string):Promise<Array<T>|null> {
    noCache();
    const supabase = createClient();
    try {
        const {data}:PostgrestSingleResponse<Array<T>> = await supabase
            .from('Post')
            .select("*")
            .eq(`${col}`, val)
        return data;
    } catch (error) {
        throw new Error("Get one post failed! " + error);
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

type RangeView = {
    maxViews: number,
    minViews: number
}
/**
 * 
 * @returns 
 */
export async function getRangeView(): Promise<RangeView> {
    const supabase = createClient();
    try {
        const { data } = await supabase
            .from('Post')
            .select('view.max(), view.min()')

        console.log("range views::> ", data);
        const result = {
            maxViews: data![0]["max"],
            minViews: data![0]["min"]
        }

        return result;
    } catch (error) {
        throw new Error("Get range view from min and max view is failed! " + error);
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