import { createClient } from "@/configs/supabase-server.config";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { findChildren } from "@tiptap/react";


export namespace FindSuzuSupabase {
    /**
     * find all rows of a table
     * @param entity 
     * @returns 
     */
    export async function findAll<T>(entity: string):Promise<Array<T> | null>  {
        const supabase = createClient();
        try {
            const {data} : PostgrestSingleResponse<Array<T>>= await supabase
                                                            .from(`${entity}`)
                                                            .select('*');
            return data;

        } catch (error) {
            throw new Error(`Get all ${entity} failed! `+ error);
        }
    }

    
    /**
     * 
     */
    // export async function findOne<T>(entity:string, keyAndValue: {key: T}): Promise<T | null>{
    //     const supabase = createClient();
    //     try {
    //         const { data } = await supabase
    //                             .from(`${entity}`)
    //                             .select('*')
    //                             .eq(`${key}`, `${value}`) as  PostgrestSingleResponse<T>;
    //         return data;
    //     } catch (error) {
    //         throw new Error(`Get all ${entity} failed! `+ error);
    //     }
    // }

    
    type FindOneEntityQuery<T> = {
        where: {
            name: string
        },
        order: {
            col:string,
            acs: boolean
        },
        limit: number
    }

    /**
     * "FindOneEntity"
     */
    export namespace FindOneEntity {
        /**
         * To implement function
         *      EX: findOneEntity("user", {where: {name: "Duc"}, order: 1, limit: 1});
         *  
         *   order: true (asc) | false (desc)
         * 
         * @param entity 
         * @param obj 
         * @returns 
         */
        export async function findOneEntity<T>(entity: string, obj: FindOneEntityQuery<T>) {
            const supabase = createClient();
            try {
                const { data } = await supabase
                                    .from(`${entity}`)
                                    .select(`${obj["where"]["name"]}`)
                                    .order(`${obj["order"]}`, {
                                        ascending: obj["order"]["acs"]
                                    })
                                    .limit(obj["limit"])
                return data;
            } catch (error) {
                throw new Error("Get one post failed!")
            }
        }
    }
}

// findOneEntity("user", { 
//     where: {
//         name: "duc"
//     },
//     order: {
//         col: "id", 
//         acs: 1
//     },
//     limit: 1
// })




