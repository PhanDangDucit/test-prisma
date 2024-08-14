import PostCategories from '@/app/ui/admin/manage-post/post-category';
import { PostCategoriesType } from '@/helpers/definitions';
import { fetchAllPostCategories } from '@/lib/data-post';

const Page = async () => {
    const categories: PostCategoriesType[] = await fetchAllPostCategories();
    return (
        <div className="my-24 mx-24">
            <PostCategories categories={categories}/>
        </div>
    );
}
 
export default Page;