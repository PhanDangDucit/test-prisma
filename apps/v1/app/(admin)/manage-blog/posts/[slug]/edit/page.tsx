import EditorBox from "@/app/ui/post/edit-editor-box";
import { PostCategoriesType, PostType } from "@/helpers/definitions";
import { fetchAllPostCategories } from "@/lib/data-post";
import { fetchPostBySlug } from '@/lib/data-post';

const Page = async ({
    params
}: {
    params: {
        slug: string
    }
}) => {
    const slug = params.slug;
    const postCategories:PostCategoriesType[] = await fetchAllPostCategories();
    const post = await fetchPostBySlug(slug) as PostType;
    return (
        post && (
            <div className="min-h-screen p-24 w-full">
                <EditorBox categories={postCategories} slug={slug} post={post}/>
            </div>
        )
    )
}

export default Page;