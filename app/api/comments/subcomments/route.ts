
import { getAllSubcommentsOfOneComment } from "@/lib/data-comment";
import { TCommentWithUser } from "@/types";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const commentMainId:number = Number(params.get('comment-main'));

    const subcomments:TCommentWithUser[] = await getAllSubcommentsOfOneComment(commentMainId);
    return Response.json(JSON.stringify(subcomments));
}