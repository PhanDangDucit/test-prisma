

import { getFielBySearchParam } from "@/helpers/http.helper";
import { catchError } from "@/helpers/response.helper";
import { getAllPosts } from "@/lib/posts/posts.lib";
import { createPost } from "@/utils/admin/manage-post/createPost";

/**
 * @url /api/posts?limit=5&offset=1
 * @param request 
 * @returns 
 */
export async function GET(request: Request) {
    const searchParam = new URLSearchParams(new URL(request.url).search);
    const limit = getFielBySearchParam({searchParam, field: "limit"})
    const offset = getFielBySearchParam({searchParam, field: "offset"})

    const data = await catchError(getAllPosts(offset, limit));
    
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

export async function POST(request: Request) {

    const {  
        title,
        content,
        thumbnail,
        email,
        userId,
        categoryName,
        // categoryId
    } = await request.json();

    await catchError(
        createPost({
            title,
            content,
            thumbnail,
            email,
            userId,
            name_post_type: categoryName,
            // categoryId
        })
    );
    
    return Response.json({
        status: 201,
        message: "add post successfully!"
    });
}