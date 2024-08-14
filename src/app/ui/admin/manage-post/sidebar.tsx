'use client'
import { PostCategoriesType, StatusPost } from '@/helpers/definitions';
import MultiRangeSlider, { 
    DateFilter,
    PostCategoriesFilter,
    PostStatusFilter,
} from '@/app/ui/admin/manage-post/filter';

export default function SideBar({
    categories,
    allStatus,
    maxViews,
    minViews
}: {
    categories: PostCategoriesType[],
    allStatus: StatusPost[],
    maxViews:number,
    minViews:number,
}) {
    return (    
        <aside 
            id="sidebar-multi-level-sidebar" 
            aria-label="Sidebar"
        >
            <div
                className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"
            >
                <h1 className='text-gray-300 text-3xl mb-8'>Filter</h1>
                <div className="space-y-2 font-medium">
                    {/* Categories */}
                    <PostCategoriesFilter categories={categories}/>
                    <PostStatusFilter allStatus={allStatus}/>
                    <DateFilter/>
                    <MultiRangeSlider
                        min={minViews}
                        max={maxViews}
                    />
                </div>
            </div>
        </aside>
    )
}