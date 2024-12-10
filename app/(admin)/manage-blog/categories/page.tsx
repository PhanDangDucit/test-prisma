import PostCategories from "@/components/admin/manage-post/post-category";
import { getAllCategories } from "@/lib/categories/categories.lib";

const Page = async () => {
    const categories = await getAllCategories();
    return (
        <div className="my-24 mx-24">
            <PostCategories categories={categories}/>
        </div>
    );
}
 
export default Page;