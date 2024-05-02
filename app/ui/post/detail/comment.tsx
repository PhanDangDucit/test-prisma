'use client'
// import { initialState } from "@/configs/constants";
import { createNewComment } from "@/lib/actions-comment";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState } from "react-dom";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDebouncedCallback } from "use-debounce";

// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

// const Msg = ({ closeToast, toastProps }) => (
//   <div>
//     Lorem ipsum dolor {toastProps.position}
//     <button>Retry</button>
//     <button onClick={closeToast}>Close</button>
//   </div>
// );

// function App() {
//   const displayMsg = () => {
//     toast(<Msg />);
//     // toast(Msg) would also work
//   };

//   return (
//     <div>
//       <button onClick={displayMsg}>Click me</button>
//       <ToastContainer />
//     </div>
//   );
// }

type NewCommentMainProps = {
    postId: number,
    userId: number,
    parentId: number
}

export function NewCommentMain({
    postId,
    userId,
    parentId
} : NewCommentMainProps){
    const initialState = { message: null || "", errors: {} };
    const createCommentWithId = createNewComment.bind(null, postId, userId, parentId);
    const [state, dispatch] = useFormState(createCommentWithId, initialState);

    const handleSubmit = useDebouncedCallback((e: React.FormEvent<HTMLFormElement>) => {
        if(!userId) {
            e.preventDefault();
            toast("You need to log in to use this feature !");
        }
    }, 1000)
    return (
        <form className="p-4" action={dispatch} onSubmit={e => handleSubmit(e)} id="form-submit-main-comment">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <label htmlFor="comment-main" className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                {/* <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                    </svg>
                    <span className="sr-only">Add emoji</span>
                </button> */}
                <textarea
                    id="comment-main"
                    name="content"
                    rows={1} 
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Your message..." 
                    defaultValue={""}
                />
                <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </form>
    );
}

export function InputReplySubComment() {
    // const handleSubmit = useDebouncedCallback((e: React.FormEvent<HTMLFormElement>) => {
    //     if(!userId) {
    //         e.preventDefault();
    //         toast("You need to log in to use this feature !");
    //     }
    // }, 1000)
    return (
        <form 
            className="ml-1" 
            // action={dispatch} onSubmit={e => handleSubmit(e)}
        >
            <label htmlFor="chat" className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            {/* <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                </svg>
                <span className="sr-only">Upload image</span>
            </button> */}
            {/* <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                </svg>
                <span className="sr-only">Add emoji</span>
            </button> */}
            <textarea id="chat" rows={1} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..." defaultValue={""} />
            <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
            </button>
            </div>
        </form>
    )
}

export function CommentItem() {
    
    // console.log("inputReplyMainComment:  ", inputReplyMainComment);
    // console.log("inputReplySubComment:  ",inputReplySubComment);
    // const inputReplyMainCommentRef = useRef();
    // const replyMainComment = () => {
    //     const inputResponseMainCommentArea = document.getElementById("sub-comment-item-2");
    //     const inputResponseMainComment = document.createElement("textarea");
    //     inputResponseMainComment.className = "ml-1 w-full bg-white border-1 border-orange-400 outline p-4 min-h-12";
    //     if(inputResponseMainCommentArea && inputResponseMainCommentArea.parentNode) {
    //         const boxParentComment = inputResponseMainCommentArea.parentNode;
    //         boxParentComment.insertBefore(inputResponseMainComment, inputResponseMainCommentArea);
    //     }
    // }

    // const replySubComment = () => {
    //     const inputResponseMainCommentArea = document.getElementById("sub-comment-item-2");
    //     const inputResponseMainComment = document.createElement("textarea");
    //     inputResponseMainComment.className = "ml-1 w-full bg-white border-1 border-orange-400 outline p-4 min-h-12";
    //     if(inputResponseMainCommentArea) {
    //        inputResponseMainCommentArea.after(inputResponseMainComment);
    //     }
    // }

    const [inputReplyMainComment, setInputReplyMainComment] = useState<React.ReactNode[]>([]);
    const [inputReplySubComment, setInputReplySubComment] = useState<React.ReactNode[]>([]);
    console.log("inputReplyMainComment:  ", inputReplyMainComment);
    console.log("inputReplySubComment:  ", inputReplySubComment);
    
    const replyMainComment = () => {
        if(inputReplyMainComment.length == 0) {
            setInputReplyMainComment(inputReplyMainComment.concat(<InputReplySubComment key={inputReplyMainComment.length}/>));
            setInputReplySubComment([]);
        }
    }

    const replySubComment = () => {
        if(inputReplySubComment.length === 0) {
            setInputReplySubComment(inputReplySubComment.concat(<InputReplySubComment key={inputReplySubComment.length}/>));
            setInputReplyMainComment([]);
        }
    }
    return (
        <div className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {/* Parent comment box */}
            <div className="pb-3 sm:pb-4">
                {/* Main comment */}
                <div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse py-4">
                        <div className="flex-shrink-0">
                            <Image 
                                className="w-8 h-8 rounded-full"
                                src="data:image/jpeg;base64,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"
                                alt="Neil image"
                                width={32}
                                height={32}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Neil Sims
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Hello.....
                            </p>
                        </div>
                    </div>
                    {/* action of main-comment*/}
                    <div className="pl-10">
                        <ul className="flex">
                            <li className="flex cursor-pointer hover:text-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>
                                <p>Thích</p>
                            </li>
                            <li className="px-4 flex cursor-pointer hover:text-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>
                                <p className="pl-2">1</p>
                            </li>
                            <li className="flex cursor-pointer px-4 hover:text-orange-500">
                                <button 
                                    className=""
                                    onClick={replyMainComment}
                                >
                                    Reply
                                </button>
                            </li>
                            <li className="px-4 cursor-pointer hover:text-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* List-subcomment */}
                <div className="pl-24 mt-2">
                   <div id="list-sub-comment" className="border-l-2 border-gray-400">
                        {/* Sub-comment-item */}
                        {inputReplyMainComment}
                        <div id="sub-comment-item-2" className="pb-3 sm:pb-4 pl-4 py-4">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                    <Image 
                                        className="w-8 h-8 rounded-full"
                                        src="data:image/jpeg;base64,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"
                                        alt="Neil image"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Neil Sims
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Hi...
                                    </p>
                                </div>
                            </div>
                            {/*  */}
                            {/* action of sub-comment*/}
                            <div className="pl-10">
                                <ul className="flex">
                                    <li className="flex cursor-pointer hover:text-orange-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                        </svg>
                                        <p>Thích</p>
                                    </li>
                                    <li className="px-4 flex cursor-pointer hover:text-orange-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                        </svg>
                                        <p className="pl-2">1</p>
                                    </li>
                                    <li className="flex cursor-pointer px-4 hover:text-orange-500">
                                        <button 
                                            className=""
                                            onClick={replySubComment}
                                        >
                                            Reply
                                        </button>
                                    </li>
                                    <li className="px-4 cursor-pointer hover:text-orange-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                        </svg>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {inputReplySubComment}
                   </div>
                </div>
            </div>
        </div>
    );
}

export default function CommentList() {
    // const [commentList, setCommentList] = useState<React.ReactNode[]>([]);
    
    return (
        <>
            {/* <CommentParentItem 
                inputReplyMainComment={inputReplyMainComment}
                inputReplySubComment={inputReplySubComment}
                replyMainComment={replyMainComment}
                replySubComment={replySubComment}
            /> */}
            <CommentItem/>
        </>
    )
}