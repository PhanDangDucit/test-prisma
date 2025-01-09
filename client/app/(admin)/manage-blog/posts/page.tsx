import PostResult from "@/components/admin/manage-post/post-result";
import PostSearchBar from "@/components/admin/manage-post/post-search";
import SideBar from "@/components/admin/manage-post/sidebar";
import { getAllCategories } from "@/lib/categories/categories.lib";
import { getPostsByFilter } from "@/lib/data-filter-post";
import { PostCategoriesType, SearchQuery } from "@/types";
import { BadgePlus } from "lucide-react";
import Link from "next/link";

export default async function Page({
    searchParams,
}: {
    searchParams: SearchQuery
}) {
  
    const search = {
        q:  searchParams.q || '',
        page:  searchParams.page || 1,
        category: searchParams.category || '',
    }

    const results = await Promise.all([
        await getPostsByFilter(search), 
        await getAllCategories()
    ]);
    const posts:PostType[] = results[0];
    const categories: PostCategoriesType[] = results[1];
    
    return (
        <div className="grid grid-cols-12 g-4 px-4">
            <div 
                className="col-start-1 col-end-3 mt-12 border-[1px] shadow-gray-300"
            >
                <SideBar
                    categories={categories}
                />
            </div>
            <div className="col-start-3 col-end-12 mt-12">
                <div className="flex">
                    <PostSearchBar/>
                    <Link 
                        href="/manage-blog/posts/create" 
                        role="button" 
                        className="btn text-orange-500"
                    >
                        <BadgePlus/>
                    </Link>
                </div>
                <PostResult posts={posts}/>
            </div>
        </div>
    );
}