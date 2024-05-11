
import { TCommentWithUser } from "@/helpers/definitions";
import { getAllSubcommentsOfOneComment } from "@/lib/data-comment";

export async function GET(request: Request) {
    // const formData = await request.formData();
    // console.log(formData);
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const commentMainId:number = Number(params.get('comment-main'));

    const subcomments:TCommentWithUser[] = await getAllSubcommentsOfOneComment(commentMainId);
    // console.log("commentMainId::", commentMainId);
    // console.log("Param::", params);
    // console.log("url", url);
    // console.log("subcomments::", subcomments);
    return Response.json(JSON.stringify(subcomments));
}