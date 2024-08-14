
import { PostCategoriesType, StatusPost } from '@/helpers/definitions';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function PostCategoriesFilter({
    categories
}:{
    categories: PostCategoriesType[]
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearchWithCategory = useDebouncedCallback((term: string, arg: string) => {
        const params = new URLSearchParams(searchParams);
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

export function PostStatusFilter({
    allStatus
} : {
    allStatus: StatusPost[]
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearchWithStatus = useDebouncedCallback((term: string, arg: string) => {
        const params = new URLSearchParams(searchParams);
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
                <label htmlFor="status-dropdown-button" className='sr-only'>Category</label>
                <input type="checkbox" className="w-full" id="status-dropdown-button"/> 
                <div className="collapse-title text-base text-gray-900">
                    Status
                </div>
                <div className="collapse-content"> 
                    {
                        allStatus && allStatus.map((status) => (
                            <div className="flex items-center mb-4" key={status.id}>
                                <input 
                                    id={status.value} 
                                    type="radio"
                                    defaultValue={status.value} 
                                    name="status-filter"
                                    onChange={(e) => handleSearchWithStatus(e.target.value, "status")}
                                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label 
                                    htmlFor={status.value}  
                                    className="uppercase cursor-pointer ms-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {status.value}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export function DateFilter() {
    const [dateRange, setDateRange] = useState([]);
    const [startDate, endDate] = dateRange;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearchWithStatus = useDebouncedCallback(() => {
        const fromDate = (new Date(startDate)).toISOString();
        const toDate = new Date(endDate).toISOString();
        const params = new URLSearchParams(searchParams);
        if(fromDate) {
            params.set(`from-date`, fromDate);
        } else {
            params.delete(`from-date`);
        }
        if(toDate) {
            params.set(`to-date`, toDate);
        } else {
            params.delete(`to-date`);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 700)

    return (
        <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={
                (update:any) => {
                    setDateRange(update)
                    handleSearchWithStatus()
                }
            }
            withPortal
            isClearable
            className='w-full mx-auto text-sm border-[1px] border-orange-300 rounded-3xl cursor-pointer'
        />
    )
}

export { MultiRangeSlider as default} from './multi-view-range';