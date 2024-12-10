import EditorBox from "@/components/users/post/create-editor-box";
import { getAllCategories } from "@/lib/categories/categories.lib";
import { PostCategoriesType } from "@/types";

export default async function Page() {
    const postCategories:PostCategoriesType[] = await getAllCategories();

    return (
        <div className="min-h-screen p-24 w-full">
            <EditorBox categories={postCategories}/>
        </div>
    )
}
