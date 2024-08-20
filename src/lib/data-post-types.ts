import { createClient } from "@/configs/supabase-server.config";

import { PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * 
 * @returns 
 */
export async function getAllCategories() {
    const {data, error} = await createClient(cookies())
        .from('post_types')
        .select("*") as PostgrestResponse<TCategory>;
    return data;
}

/**
 * 
 * @param {string} name 
 * @returns 
 */
export async function getCategoryByName(name: string) {
    const { data, error } = await createClient(cookies())
        .from("post_types")
        .select("*")
        .eq("name_post_type", name)
        .single() as PostgrestSingleResponse<TCategory>

    return { data, error }
}

