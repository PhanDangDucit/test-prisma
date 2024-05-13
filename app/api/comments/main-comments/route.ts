
import { TCommentWithUser } from "@/helpers/definitions";
import { getAllSubcommentsOfOneComment } from "@/lib/data-comment";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const commentMainId:number = Number(params.get('post'));
    // const subcomments:TCommentWithUser[] = await getAllSubcommentsOfOneComment(commentMainId);
    // return Response.json(JSON.stringify(subcomments));
}