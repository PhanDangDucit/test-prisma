// import { PostType } from "@/helpers/definitions";
import { createClient } from "@/configs/supabase-server.config";
import { SearchQuery } from "@/helpers/definitions";
// import moment from 'moment';

/**
 * Get post when admin only filter query
 * @param q
 * @returns 
 */
export async function getPostsByFilter(search:SearchQuery) {
    const supabase = createClient();

    const q = search.q;
    const fromDate = search['from-date'];
    const toDate = search['to-date'];
    const minViews = search['min-view'];
    const maxViews = search['max-view'];
    const category = search['category'];
    const status = search['status'] == 'hidden' ? 'Hidden' :'Show';

    try {
        /**
         * Get data from supabase to filter post
         */
        const { data, error } = await supabase
            .from('Post')
            .select('*')
            .gte('created_at', fromDate)
            .lte('created_at', toDate)
            .gte('view', minViews)
            .lte('view', maxViews)
            .neq('status', status)
            .or(`Post_Type.name_post_type.ilike.${q}, slug.ilike.${q}, content.ilike.${q}`)
            .eq('Post_Type.category', category)
            .order('id', {ascending: false});
        return data;
    } catch (error) {
        throw new Error("Get post when filter is failed! " + error);
    }
    
}
