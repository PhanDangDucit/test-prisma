import { createClient } from "@/configs/supabase-server.config";
import { TComment, TCommentWithUser } from "@/helpers/definitions";

export const sortMainComments = (mainComments:TCommentWithUser[]) => {
    return mainComments.sort(
        (firstComment, secondComment) => Number(secondComment.id) - Number(firstComment.id)
    );
}

export async function updateCommentCount(postId:number) {
    const supabase = createClient();
    const { data } = await supabase
        .from('Post')
        .update({ comment_count: 1 })
        .eq('id', postId)
        .select()
    return data![0];
}

/**
 * 
 * @param datas 
 * @returns 
 */
export async function insertComment(datas:Partial<TComment>) {
    const supabase = createClient();
    const { data } = await supabase
        .from('Comment')
        .insert(datas)
        .select()
    return data![0];    
}

export async function updateSubCommentCount(parentId:number) {
    const supabase = createClient();
    const { data } = await supabase
        .from('Comment')
        .update({ subcomment_count: 1 })
        .eq('id', parentId)
        .select()
    return data![0];
}