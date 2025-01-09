"use client"
import "react-datepicker/dist/react-datepicker.css";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { PostCategoriesType,  } from "@/types";

export function PostCategoriesFilter({
    categories
}:{
    categories: PostCategoriesType[]
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearchWithCategory = useDebouncedCallback((term: string, arg: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if(term) {
            params.set(`${arg}`, term);
        } else {
            params.delete(`${arg}`);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 700)
    return (
        <>
            <div className="collapse collapse-arrow">
                <label htmlFor="category-dropdown-button" className='sr-only'>Category</label>
                <input type="checkbox" className="w-full" id="category-dropdown-button"/> 
                <div className="collapse-title text-base text-gray-900">
                    Categories
                </div>
                <div className="collapse-content"> 
                <div className="flex items-center mb-4">
                    <input 
                        id="all-categories"
                        type="radio" 
                        name="post-categories"
                        onChange={(e) => handleSearchWithCategory(e.target.value, 'category')}
                        defaultValue=""
                        className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="all-categories"
                        className="cursor-pointer ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        All
                    </label>
                </div>
                {
                    categories && categories.map((category) => (
                        <div className="flex items-center mb-4" key={category.id}>
                            <input 
                                id={category.name_post_type} 
                                type="radio" 
                                defaultValue={category.name_post_type} 
                                name="post-categories" 
                                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={(e) => handleSearchWithCategory(e.target.value, 'category')}
                            />
                            <label 
                                htmlFor={category.name_post_type}  
                                className="cursor-pointer ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 uppercase"
                            >
                                {category.name_post_type}
                            </label>
                        </div>
                    ))
                }
                </div>
            </div>
        </>
    )
}