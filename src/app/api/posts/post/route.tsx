
import { PostType } from "@/helpers/definitions";
import { fetchPostBySlug } from "@/lib/data-post";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const slug = params.get('slug') as string;
    const post = await fetchPostBySlug(slug) as PostType;
    return Response.json(JSON.stringify(post));
}