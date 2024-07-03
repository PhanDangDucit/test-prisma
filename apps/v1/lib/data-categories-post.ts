import { createClient } from "@/configs/supabase-server.config";
import { PostCategoriesType } from "@/helpers/definitions";
import { FindSuzuSupabase } from "@/libs/suzu-supabase-find";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_noStore as noCache } from 'next/cache';

export async function getAllCategories() {
    return await FindSuzuSupabase.findAll<PostCategoriesType>('Post_Type');
}

export async function getOneCategory<T>(col: string, val: number|string):Promise<Array<T>|null> {
    noCache();
    const supabase = createClient();
    try {
        const {data}:PostgrestSingleResponse<Array<T>> = await supabase
            .from('Post_Type')
            .select("*")
            .eq(`${col}`, val)
        return data;
    } catch (error) {
        throw new Error("Get one post failed! " + error);
    }
}
