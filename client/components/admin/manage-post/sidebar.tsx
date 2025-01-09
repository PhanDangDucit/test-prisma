'use client'
import { 
    PostCategoriesFilter,
} from './filter';
import { PostCategoriesType } from '@/types';

export default function SideBar({
    categories,
}: {
    categories: PostCategoriesType[],
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
                </div>
            </div>
        </aside>
    )
}