import { createClient } from "@/configs/supabase-server.config";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { FindOneEntityQuery } from "@/libs/types/find-type";
import { findOneWithOrder, findOneWithSelect } from "./utils/select.util";

export namespace FindSuzuSupabase {
    /**
     * find all rows of a table
     * @param entity 
     * @returns 
     */
    export async function findAll<T>(entity: string):Promise<Array<T> | null>  {
        const supabase = createClient();
        try {
            const { data } : PostgrestSingleResponse<Array<T>> = 
                await supabase.from(`${entity}`).select('*');
            return data;

        } catch (error) {
            throw new Error(`Get all ${entity} failed! `+ error);
        }
    }

    /**
     * "FindOneEntity"
     */
    // export namespace FindOne {
    //     /**
    //      * To implement function 
    //      *     
    //      * @param entity 
    //      * @param obj
    //      * @returns 
    //      */
    //     export async function findOneSort<T>(
    //         entity: string, 
    //         obj: FindOneEntityQuery<T>
    //     ):Promise<Array<Partial<T>> | null> {
    //         const supabase = createClient();
    //         const {colOrder, asc} = findOneWithOrder<T>(obj["order"]);
    //         const colsSelect = findOneWithSelect<T>(obj["where"]);

    //         try {
    //             const { data }:PostgrestSingleResponse<Array<Partial<T>>> = await supabase
    //                                 .from(`${entity}`)
    //                                 .select(colsSelect)
    //                                 .order(colOrder, { ascending: asc})
    //                                 .limit(obj["limit"])
    //             return data;

    //         } catch (error) {
    //             throw new Error("Get one post failed!")
    //         }
    //     }
    // }
}



// export async function getOnePost(post_type_id: number, limit: number = 1) {
//     return await FindSuzuSupabase.FindOne.findOneSort<PostType>("Post", {
//             where: {
//                 post_type_id
//             },
//             order: {
//                 id: false
//             },
//             limit
//     })
// }