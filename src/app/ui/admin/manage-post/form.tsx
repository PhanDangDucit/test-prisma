import { PostType } from "@/helpers/definitions";
import { changeStatusPost } from "@/lib/actions-post";

export async function FormChangeIsShowPost({
    status,
    post
}:{
    post:PostType
    status: string
}) {
    const changeStatusPostWithId = changeStatusPost.bind(null, post.id);
    return (
        <>
            <form 
                action={changeStatusPostWithId} 
                className="border-[1px] border-orange-200 -translate-x-6 p-2 bg-black text-white hover:bg-gray-100 hover:text-black"
            >
                {
                    status === "show" ? (
                        <>
                            <label htmlFor="is-show" className="cursor-pointer block">Hidden</label>
                            <input type="submit" id="is-show" name="isShow" hidden/>
                        </>
                    ) : (
                        <>
                            <label htmlFor="hidden" className="cursor-pointer block">Show</label>
                            <input type="submit" id="hidden" name="isShow" hidden/>
                        </>
                    )
                }
            </form>
        </>
    )
}