

import { getFielBySearchParam } from "@/helpers/http.helper";
import { catchError } from "@/helpers/response.helper";
import { getAllPosts } from "@/lib/posts/posts.lib";

/**
 * @url /api/posts?limit=5&offset=1
 * @param request 
 * @returns 
 */
export async function GET(request: Request) {
    const searchParam = new URLSearchParams(new URL(request.url).search);
    const limit = getFielBySearchParam({searchParam, field: "limit"})
    const offset = getFielBySearchParam({searchParam, field: "offset"})

    const data = await catchError(await getAllPosts(offset, limit));
    
    if(data.error) {
        return Response.json({
            status: 404,
            message: "All posts not found!"
        })
    }
    return Response.json({
        status: 201,
        data
    });
}