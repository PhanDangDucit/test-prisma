'use client'
import { useEditor, EditorContent } from '@tiptap/react';

// component
import { useState } from "react";
import { createNewPost } from '@/lib/actions-post';
import { editorConfig } from '@/configs/editor.config';
import { useFormState } from 'react-dom';
import { initialState } from '@/configs/constants';
import { PostCategoriesType } from '@/types';
import Toolbar from './toolbar';
import SidebarPost from './sidebar-post';
import { useAdminInfoContext } from '@/stores/admin/admin-info';
import { getURL } from '@/helpers/http.helper';

const EditorBox = ({
    categories,
}: {
    categories: PostCategoriesType[],
}) => {
    const { adminInfo } = useAdminInfoContext();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [categoryName, setCategoryName] = useState(categories[0].name_post_type ?? "");


    function handleChange(content: string) {
        setContent(content);
    }

    const editor = useEditor(editorConfig);

    if(!editor) return null;
    editor.on('update',() => handleChange(editor?.getHTML() || ''));
    console.log("categoryName: ", categoryName)

    const addPost = () => {
        const payload = {
            title,
            content,
            thumbnail,
            email: adminInfo.email ?? "phanduc.flp@gmail.com",
            categoryName,
            userId: adminInfo.id ?? 1
        }

        fetch(`${getURL()}/api/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
    }

    return (
        <form className='grid grid-cols-3 gap-3'>
            <div className='col-start-1 col-end-3 border-2 border-orange-400 rounded-xl p-5'>
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text"
                        name="title" 
                        id="title" 
                        className="block py-2.5 px-0 w-full font-medium text-3xl text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        required
                        onChange={e => setTitle(e.target.value)}
                    />
                    <label 
                        htmlFor="title" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Title
                    </label>
                </div>
                <Toolbar
                    editor={editor} 
                />
                <EditorContent editor={editor}/>
            </div>

            <div className='border-2 border-orange-300 rounded-3xl p-8'>
                <div>
                    <label htmlFor="Category" className=" mt-4 block mb-2 text-sm font-medium text-gray-400 dark:text-white">Category</label>
                    <select 
                        id="Category" 
                        defaultValue={categoryName}
                        name="post_type_id"
                        onChange={e => setCategoryName(e.target.value)}
                        className="cursor-pointer bg-base-100 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {
                            categories && categories.map((category)=> (
                                <option value={category.name_post_type} key={category.id}>{category.name_post_type}</option>
                            ))
                        }
                    </select>
                </div>
                <button 
                    type="button"
                    onClick={addPost}
                    className="cursor-pointer mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Publish
                </button>
            </div>
        </form>
    )
}

export default EditorBox;