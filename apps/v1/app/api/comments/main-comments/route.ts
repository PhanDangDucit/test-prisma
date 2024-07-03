
import { TCommentWithUser } from "@/helpers/definitions";
import { getAllMainComments } from "@/lib/data-comment";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const postId:number = Number(params.get('post-id'));
    const subcomments:TCommentWithUser[] = await getAllMainComments(postId);
    return Response.json(JSON.stringify(subcomments));
}