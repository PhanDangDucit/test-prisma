'use client'
import Image from "next/image";
import { upload } from '@vercel/blob/client';
import { useState } from "react";
import { useFormState } from "react-dom";
import { initialState } from "@/configs/constants";
import { PostCategoriesType } from "@/helpers/definitions";
import initIcon from "@/public/tree.jpg";
import { updatePostCategory } from "@/lib/actions-post";

export const EditModalPostCategories = ({
    category
}:{
    category: PostCategoriesType
}) => {
    const updatePostCategoryWithId = updatePostCategory.bind(null, category.id)
    const [state, dispatch] = useFormState(updatePostCategoryWithId, initialState);
    const [icon, setIcon] = useState<string>(category.icon || '');
    const [loading, setLoading] = useState<boolean>(false);
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            throw new Error('No file selected');
        }
        setLoading(true);
        const file = e.target.files[0];
        const result = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/blog/create/upload',
        });
        setLoading(false);
        setIcon(result?.url);
    }
    return (
        <div className="mt-5">
            {/* Modal toggle */}
            <button 
                data-modal-target={`edit-modal-${category.id}`} 
                data-modal-toggle={`edit-modal-${category.id}`} 
                className="font-medium text-blue-600 dark:text-blue-500"
                type="button"
                title={`edit-category ${category.id}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>
            {/* Main modal */}
            <div id={`edit-modal-${category.id}`} tabIndex={-category.id} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Category {category.id}
                            </h3>
                            <button 
                                type="button" 
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                                data-modal-toggle={`edit-modal-${category.id}`}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form className="p-4 md:p-5" action={dispatch}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input 
                                        type="text" name="name_post_type" id="name" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        placeholder="Type post categories name" required
                                        defaultValue={category.name_post_type}
                                    />
                                </div>
                                <label className="col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="icon">Icon</label>
                                    {
                                        loading ? (
                                            <div role="status" className='w-12 h-12 flex items-center justify-center'>
                                                <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-orange-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>

                                        ) : (
                                            <div className="col-span-2 mt-2 mb-2 border-[1px] border-gray-300 rounded-xl relative w-[100px] h-[100px]">
                                                <Image
                                                    src={category.icon || initIcon}
                                                    alt="icon"
                                                    // width={100}
                                                    // height={100}
                                                    fill
                                                    priority
                                                    className="rounded-xl"
                                                />
                                            </div>
                                        )
                                    }
                                <input
                                    className="block col-span-2 w-2/4 text-sm text-gray-400 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    aria-describedby="icon_help" 
                                    id="icon"
                                    alt="icon"
                                    type="file"
                                    onChange={(e) => handleUpload(e)}
                                />
                                
                                <input 
                                    type="text"
                                    name="icon" 
                                    hidden
                                    defaultValue={icon}
                                />
                                <div className="col-span-2">
                                    <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">priority</label>
                                    <input 
                                        type="number"
                                        name="priority"
                                        id="priority"
                                        min={0}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                        required
                                        defaultValue={category.priority}
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}