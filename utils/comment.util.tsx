import { TCommentWithUser } from "@/helpers/definitions";

export const sortMainComments = (mainComments:TCommentWithUser[]) => {
    return mainComments.sort(
        (firstComment, secondComment) => Number(secondComment.id) - Number(firstComment.id)
    );
}