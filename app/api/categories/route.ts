

import { catchError } from "@/helpers/response.helper";
import { getAllCategories } from "@/lib/categories/categories.lib";

/**
 * @url /api/posts?limit=5&offset=1
 * @param request 
 * @returns 
 */
export async function GET(request: Request) {
    const data = await catchError(getAllCategories());
    
    if(data.error) {
        return Response.json({
            status: 404,
            message: "All categories not found!"
        })
    }
    return Response.json({
        status: 201,
        data
    });
}