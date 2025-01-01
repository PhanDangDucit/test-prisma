import EditorBox from "@/components/users/post/create-editor-box";
import { getAllCategories } from "@/lib/categories/categories.lib";
import { fetchPostBySlug } from "@/lib/posts/posts.lib";
import { PostCategoriesType } from "@/types";

const Page = async ({
    params
}: {
    params: {
        slug: string
    }
}) => {
    const slug = params.slug;
    const postCategories:PostCategoriesType[] = await getAllCategories();
    const post = await fetchPostBySlug(slug) as PostType;

    return (
        post && (
            <div className="min-h-screen p-24 w-full">
                <EditorBox categories={postCategories}/>
            </div>
        )
    )
}

export default Page;