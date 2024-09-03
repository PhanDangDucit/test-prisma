import PostResult from "@/app/ui/admin/manage-post/post-result";
import PostSearchBar from "@/app/ui/admin/manage-post/post-search";
import SideBar from "@/app/ui/admin/manage-post/sidebar";
import { PostCategoriesType, PostType, SearchQuery } from "@/helpers/definitions";
import { fetchAllPostCategories, getRangeView } from '@/lib/posts/data-post';
import { getPostsByFilter } from "@/lib/data-filter-post";
import { BadgePlus } from "lucide-react";
import Link from "next/link";

export default async function Page({
    searchParams,
}: {
    searchParams: SearchQuery
}) {
    let {
        maxViews,
        minViews
    } = await getRangeView();
    console.log("Max views::", maxViews, "Min views::", minViews);
    if(!maxViews && !minViews) {
        maxViews = 0;
        minViews = 0;
    }
    // const today = (new Date()).toISOString().split('T')[0];
    const dateObj = new Date();
    const date = `${dateObj.getFullYear()}-${dateObj.getMonth()-1}-${dateObj.getDate()} `;
    const fromDate = (new Date(`${date}`)).toISOString();
    const toDate = new Date();
    const search = {
        q:  searchParams.q || '',
        page:  searchParams.page || 1,
        status: searchParams.status === "hidden" ? "hidden": "show",
        category: searchParams.category || '',
        'min-view': searchParams['min-view'] || `${minViews}`,
        'max-view': searchParams['max-view'] || `${maxViews}`,
        'from-date': searchParams['from-date'] || fromDate,
        'to-date': searchParams['to-date'] || toDate,
    }

    // const currentPage = Number(searchParams?.page) || 1;
    // const totalPages = await fetchInvoicesPages(query);
    // const posts:PostType[] = await getPostsByFilter(search);
    // const categories: PostCategoriesType[] = await fetchAllPostCategories();
    
    const results = await Promise.all([
        await getPostsByFilter(search), 
        await fetchAllPostCategories()
    ]);
    const posts:PostType[] = results[0];
    const categories: PostCategoriesType[] = results[1];
    // console.log("status::", search.status);
    // const allStatusPost: StatusPost[] = await getAllStatus();
    const allStatusPost = [{id: 1, value:"show"}, {id: 2, value:"hidden"}];
    
    return (
        <div className="grid grid-cols-12 g-4 px-4 bg-gray-200">
            <div 
                className="col-start-1 col-end-3 mt-12 border-[1px] shadow-gray-300"
            >
                <SideBar
                    categories={categories}
                    allStatus={allStatusPost}
                    maxViews={maxViews!}
                    minViews={minViews!}
                />
            </div>
            <div className="col-start-3 col-end-12 mt-12">
                <div className="flex">
                    <PostSearchBar/>
                    <Link href="/manage-blog/posts/create" role="button" className="btn text-orange-500">
                        <BadgePlus/>
                    </Link>
                </div>
                <PostResult posts={posts} status={search.status}/>
            </div>
        </div>
    );
}