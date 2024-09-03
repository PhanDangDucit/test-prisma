
import { PostType } from "@/helpers/definitions";
import { fetchNewPostRelated } from "@/lib/posts/data-post";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const postTypeId:number = Number(params.get('post_type_id'));
    const posts:PostType[] = await fetchNewPostRelated(postTypeId);
    return Response.json(JSON.stringify(posts));
}