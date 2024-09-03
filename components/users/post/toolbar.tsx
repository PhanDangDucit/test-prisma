"use client";

import { upload } from '@vercel/blob/client';
import Tippy from '@tippyjs/react';
// import { gitHubEmojis } from '@tiptap-pro/extension-emoji';
import { type Editor } from "@tiptap/react";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
    AlignRight,
    AlignCenter,
    AlignLeft,
    Pilcrow,
    ListPlus,
    ListTree,
    SmilePlus,
    FileImage,
    // Image
} from "lucide-react";
import EmotionPopup from './emotion-popup';
import { useRef } from 'react';
import Image, { getImageProps } from 'next/image';
// import { useState } from 'react';
// import { useCallback } from "react";
// import { upload } from '@vercel/blob/client';

// const ImageInserted = ({
//     src, 
//     alt, 
//     title
// }:{
//     src: StaticImport, 
//     alt:string, 
//     title:string
// }) => {
   
//     return (
//         <Image src={src} width={10} height={10} alt={alt} title={title}/>
//     )
// }

const Toolbar = ({
    editor, 
    // cursorPosition
}: {
    editor: Editor|null, 
    // cursorPosition:number
}) => {
    // let isShowEmoji = false;
    // const addImage = useCallback(() => {
    //     const url = window.prompt('URL')
    //         if (url) {
    //             editor.chain().focus().setImage({ src: url }).run()
    //         }
    // }, [editor])
    const inputImageRef = useRef(null);
    if (!editor) return null;
    // const $myCustomPos = editor.$pos(cursorPosition + 1);
    // console.log("mynodepos::", $myCustomPos);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            throw new Error('No file selected');
        }
        const file = e.target.files[0];
        const name = file.name;
        const result = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/upload-vercel',
        });
        console.log("url::  ", result?.url);
        editor.commands.setImage({src:`${result?.url}`, alt:`${name}`, title:`${name}`})
    }
    
    // const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!e.target.files) {
    //       throw new Error('No file selected');
    //     }
    //     const file = e.target.files[0];
    //     const name = file.name;
    //     const formData = new FormData();
    //     // append file to FormData
    //     formData.append("file", file);
    //     // const src = `./assets/posts/images/${name}`;
    //     // const {
    //     //     props: { ...rest },
    //     // } = getImageProps({
    //     //     src,
    //     //     width:12,
    //     //     height:12,
    //     //     alt:`${name}`
    //     // })
    //     // // editor.commands.insertContentAt(
    //     //     $myCustomPos, 
    //     //     `<picture>
    //     //         <img 
    //     //             src=${rest.src}
    //     //             width=${rest.width}
    //     //             height=${rest.height}
    //     //             alt=${rest.height}
    //     //         />
    //     //     </picture>`
    //     // )
    //     // console.log("rest", rest)
    //     const result = await fetch("/api/upload-server", {
    //         method: "POST",
    //         body: formData,
    //     })
    //     // const images = <img src="${src}" alt=${name} title=${name}/>
    //     // editor.commands.insertContentAt(
    //     //     9, 
    //     //     `<img ${...rest}/>`
    //     // )
    //     // setTimeout(()=> {
    //         //     // <ImageInserted 
    //         //     //     src={src}
    //         //     //     alt={`${name}`} 
    //         //     //     title={`${name}`}
    //         //     // />
    //         //     `<div id="box-${name}"></div>`
    //         //     // `<img ${...rest}/>`
    //         // )
    //         // editor.commands.setImage({...rest})
    //         editor.commands.setImage({src:`${name}`, alt:`${name}`, title:`${name}`})
    //     // }, 5000);
    //     console.log(await result.json());
    // }

    const peekImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // console.log(inputImageRef.current);
        if(inputImageRef.current) {
            const input: HTMLElement = inputImageRef.current;
            input.click();
        }
    }
    return (
        <div
            className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
            gap-5 w-full flex-wrap border border-gray-700"
        >
            <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
            {/* Bold */}
            <button
                type="button"
                title="bold"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBold().run();
                }}
                className = {
                    editor.isActive("bold")
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400"
                }
            >
                <Bold className="w-5 h-5" />
            </button>
            {/* Italic */}
            <button
               type="button"
               title="italic"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                }}
                className = {
                editor.isActive("italic")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
            >
                <Italic className="w-5 h-5" />
            </button>
            {/* Underline */}
            <button
                type="button"
                title="underline"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleUnderline().run();
                }}
                className={
                editor.isActive("underline")
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
            >
                <Underline className="w-5 h-5" />
            </button>
            {/* Stricke */}
            <button
                type="button"
                title="strike"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleStrike().run();
                }}
                className={
                    editor.isActive("strike")
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400"
                }
            >
                <Strikethrough className="w-5 h-5" />
            </button>
            {/* Heading */}
            <button
                type="button"
                title="heading"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={
                    editor.isActive("heading", { level: 2 })
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400"
                }
            >
                <Heading2 className="w-5 h-5" />
            </button>
            {/* Subheading */}
            <button
                type="button"
                title="subheading"
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={
                    editor.isActive("heading", { level: 5 })
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400"
                }
            >
                <Pilcrow className="w-5 h-5" />
            </button>
            {/* Bullet */}
            <button
                type="button"
                title="bullet"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBulletList().run();
                }}
                className={
                    editor.isActive("bulletList")
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400"
                }
            >
                <List className="w-5 h-5" />
            </button>
            {/* Ordered */}
            <button
                type="button"
                title="ordered"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleOrderedList().run();
                }}
                className = {
                    editor.isActive("orderedList")
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400"
                }
            >
                <ListOrdered className="w-5 h-5" />
            </button>
            {/* SplitList */}
            <button
                type="button"
                title="split list"
                onClick={
                    () => editor.chain().focus().splitListItem('listItem').run()
                }
            >
                <ListPlus />
            </button>
            {/* ListItem */}
            <button
                type="button"
                title="listitem"
                onClick={
                    () => editor.chain().focus().sinkListItem('listItem').run()
                }
            >
                <ListTree />
            </button>
            {/* AlignLeft */}
            <button
                type="button"
                title="left"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setTextAlign('left').run();
                }}
                className={
                    editor.isActive({ textAlign: 'left' })
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400"
                }
            >
                <AlignRight className="w-5 h-5" />
            </button>
            {/* AlignCenter */}
            <button
                type="button"
                title="center"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setTextAlign('center').run();
                }}
                className={
                    editor.isActive({ textAlign: 'center' })
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400"
                }
            >
                <AlignCenter className="w-5 h-5" />
            </button>
            {/* AlignLeft */}
            <button
                type="button"
                title="right"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().setTextAlign('right').run();
                }}
                className={
                    editor.isActive({ textAlign: 'right' })
                    ? "bg-sky-700 text-white p-2 rounded-lg"
                    : "text-sky-400"
                }
            >
                <AlignLeft className="w-5 h-5" />
            </button>
            {/* BlockQuote */}
            <button
                type="button"
                title="quote"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBlockquote().run();
                }}
                className={
                    editor.isActive("blockquote")
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400"
                }
            >
                <Quote className="w-5 h-5" />
            </button>
            {/* Code block */}
            <button
                type="button"
                title="code block"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleCodeBlock().run();
                }}
                className={
                    editor.isActive("code")
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400"
                }
            >
                <Code className="w-5 h-5" />
            </button>
            {/* Undo */}
            <button
                type="button"
                title="undo"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().undo().run();
                }}
                className={
                    editor.isActive("undo")
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
                }
            >
                <Undo className="w-5 h-5" />
            </button>
            {/* Redo */}
            <button
                type="button"
                title="button change"
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().redo().run();
                }}
                className={
                    editor.isActive("redo")
                        ? "bg-sky-700 text-white p-2 rounded-lg"
                        : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
                }
            >
                <Redo className="w-5 h-5" />
            </button>
            {/* Add image */}
            <button
                type="button"
                title="button change"
                onClick={
                    (e) => peekImage(e)
                }
                className="active:bg-sky-700 active:text-white active:p-2 active:rounded-lg text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
            >
                <FileImage className="w-5 h-5" />
                {/* <label className='peer-checked'><Image className="w-5 h-5" /></label> */}
                <input type='file' hidden ref={inputImageRef} onChange={
                    (e) => handleUpload(e)
                }/>
            </button>
            {/* add icon */}
            <Tippy
                content = { <EmotionPopup editor={editor}/> }
                placement='top-end'
                className='bg-black translate-x-1/2' 
                trigger="click mouseenter focus"
                hideOnClick="toggle"
                interactive={true}
            >
                <button
                    type='button'
                    id="emoji"
                >
                    <SmilePlus className="w-5 h-5"/>{' '}
                </button>
            </Tippy>
        </div>
      </div>
    );
};

export default Toolbar;
