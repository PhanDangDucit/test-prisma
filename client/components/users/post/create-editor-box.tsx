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

const EditorBox = ({
    categories,
}: {
    categories: PostCategoriesType[],
}) => {
    const { adminInfo } = useAdminInfoContext();

    const [content, setContent] = useState('');
    function handleChange(content: string) {
        setContent(content);
    }

    const editor = useEditor(editorConfig);
    const createNewPostAndAddUserId = createNewPost.bind(null, adminInfo.id!);
    const [state, dispatch] = useFormState(createNewPostAndAddUserId, initialState);
    if(!editor) return null;
    editor.on('update',() => handleChange(editor?.getHTML() || ''));

    return (
        <form className='grid grid-cols-3 gap-3' action={dispatch}>
            <div className='col-start-1 col-end-3 border-2 border-orange-400 rounded-xl p-5'>
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text"
                        name="title" 
                        id="title" 
                        className="block py-2.5 px-0 w-full font-medium text-3xl text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        required
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
                <input type="text" defaultValue={content} hidden name='content'/>
            </div>
            <div className='border-2 border-orange-300 rounded-3xl p-8'>
                <SidebarPost 
                    categories={categories} 
                />
            </div>
        </form>
    )
}

export default EditorBox;