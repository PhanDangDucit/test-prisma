'use client'
import { TCommentWithUser } from "@/helpers/definitions";
import { createNewComment } from "@/lib/actions-comment";
import { CornerDownRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import conan from "@/public/conan.jpg";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDebouncedCallback } from "use-debounce";
import { nanoid } from 'nanoid';

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

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(!userId) {
            toast("You need to log in to comment !");
        }
        const input:HTMLInputElement|null = document.querySelector("#comment-main");
        if(input) {
            input.value = "";
        }
        const listener = function () {
            e.preventDefault();
        };
        const btn = document.querySelector("#btn-submit-main-comment");
        // btn?.addEventListener("click", listener);
        setTimeout(function() {
            btn?.removeEventListener("click", listener);
        }, 1000)
    }
    
    return (
        <form className="p-4" action={dispatch}>
            <label htmlFor="comment-main" className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <input
                    id="comment-main"
                    name="content"
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Your message..." 
                    defaultValue={""}
                />
                <button
                    type="submit"
                    id="btn-submit-main-comment"
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                    onClick={e => handleSubmit(e)}
                >
                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </form>
    );
}

export function InputReplyComment({
    value,
    userId,
    postId,
    parentId,
    removeInputComment
}:{
    userId: number,
    postId: number,
    value: string,
    parentId: number,
    removeInputComment:() => void
}) {
    const initialState = { message: null || "", errors: {} };
    const createCommentWithId = createNewComment.bind(null, postId, userId, parentId);
    const [state, dispatch] = useFormState(createCommentWithId, initialState);

    const hanldeIsAuthUser = useDebouncedCallback((e: React.FormEvent<HTMLFormElement>) => {
        const input:HTMLInputElement|null = document.querySelector("#subcomment");
        if(input) {
            input.value = value + " ";
        }
        toast("You need to log in to comment !");
    }, 1000)

    const hanleSubmitFormAction = useDebouncedCallback(()=> {
        removeInputComment()
    }, 1000)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if(!userId) {
            e.preventDefault();
            hanldeIsAuthUser(e);
            return;
        }
        const btn = document.querySelector('#btnSubmit');
        if(btn) {
            hanleSubmitFormAction();
        }
    }

    useEffect(
        () => {
            const input:HTMLInputElement|null = document.querySelector("#subcomment");
            if(input) {
                input.value = value + " ";
                input.focus();
            }
        }, [value]
    )

    return (
        <>
            <form 
                className="ml-1"
                action={dispatch}
                id="form-submit-subcomment"
                onSubmit={e => handleSubmit(e)}
            >
                <label htmlFor="subcomment" className="sr-only">Your message</label>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <input
                        id="subcomment"
                        name="content"
                        // ref={inputRef}
                        className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        defaultValue={`${value}` + " "}
                    />
                    <button 
                        type="submit" 
                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                        // onClick={e => handleSubmit(e)}
                        id="btnSubmit"
                    >
                        <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
            {/* <a href="cskncja" onClick={e => handleSubmit(e)} className="text-black">what?</a> */}
        </>
    )
}

function MainComment({
    mainComment,
    replyComment
}:{
    mainComment:TCommentWithUser
    replyComment: (commentListId: number, usernameReplyed:string) => void
}) {
    return (
        <div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse py-4">
                <div className="flex-shrink-0">
                    <Image 
                        className="w-8 h-8 rounded-full"
                        src={mainComment.user.avatar || conan}
                        alt={mainComment.user.username||""}
                        width={32}
                        height={32}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {mainComment.user.username!}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {mainComment.content}
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
                            onClick={(e) => replyComment(mainComment.id, mainComment.user.username!)}
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
    )
}

function SubComment({
    subcomment,
    replyComment,
    mainComment
}:{
    subcomment:TCommentWithUser
    replyComment:(commentListId: number, usernameReplyed:string) => void,
    mainComment:TCommentWithUser
}) {
    return (
        <div className="pb-3 sm:pb-4 pl-4 py-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                    <Image 
                        className="w-8 h-8 rounded-full"
                        src={subcomment.user.avatar || conan}
                        alt={subcomment.user.username||""}
                        width={32}
                        height={32}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {subcomment.user.username!}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {subcomment.content}
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
                            onClick={(e) => replyComment(mainComment.id, subcomment.user.username!)}
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
    )
}

export function CommentItem({
    subcommentCount,
    mainComment,
    replyComment,
}:{
    subcommentCount: number|null,
    mainComment: TCommentWithUser,
    replyComment: (commentListId: number, usernameReplyed:string) => void,
}) {
    const mainCommentId:number = mainComment.id;

    const [subcomments, setSubcommnets] = useState<TCommentWithUser[]>([]);
    
    // Get comment through fetch Api
    const handleShowComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setShowSubcomments(true);
        const result =  fetch(`http://localhost:3000/api/comments/subcomments?comment-main=${mainCommentId}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })

        result
            .then(res => res.json())
            .then((arr) => setSubcommnets(JSON.parse(arr)))
            .catch(error => console.log(`error`));
    }
    
    const [isShowSubcomments, setShowSubcomments] = useState(false);

    return (
        <div className="max-w-md">
            <MainComment
                mainComment={mainComment}
                replyComment={replyComment}
            />
            {/* List-subcomment */}
            <div className="pl-24 mt-2">
                {
                    subcommentCount && !isShowSubcomments ? (
                        <button 
                            type="button"
                            onClick={e => handleShowComment(e)}
                            className="flex my-4"
                        >
                            <CornerDownRight className="w-6 h-6"/>
                            <p>{subcommentCount} responses</p>
                        </button>
                    ) : (
                        <>
                            {
                                isShowSubcomments && subcomments.length === 0 ? (
                                    <div 
                                        className="border-l-2 border-gray-400"
                                        key={nanoid()}
                                    >
                                        <div className="relative items-center block max-w-sm p-6">
                                            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {
                                            subcomments.map((subcomment) => (
                                                <div 
                                                    className="border-l-2 border-gray-400" 
                                                    key={subcomment.id}
                                                >
                                                    <SubComment
                                                        subcomment={subcomment} 
                                                        replyComment={replyComment}
                                                        mainComment={mainComment}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default function CommentList({
    allMainComments,
    userId,
    postId
} : {
    allMainComments:TCommentWithUser[],
    userId: number,
    postId: number
}) {
    const [inputReplyComment, setInputReplyComment] = useState<React.ReactNode[]>([]);
    const [position, setPosition] = useState<number>();
    // let usernameRef = useRef("");
    console.log("inputReplyComment::", inputReplyComment);
    const handleAddInputComment = 
        (
            commentId: number,
            usernameReplyed: string,
        ) => {
            setInputReplyComment([]);
            console.log("usernameReplyed::", usernameReplyed);
            // usernameRef.current = usernameReplyed;
            console.log("commentId::" + commentId);
            setPosition(commentId);
            setInputReplyComment([
                <div key={nanoid()}>
                    <InputReplyComment
                        value={usernameReplyed}
                        userId={userId}
                        postId={postId}
                        parentId={commentId}
                        removeInputComment={removeInputComment}
                    />
                </div>
            ]);
        }
    const removeInputComment = () => {
        setInputReplyComment([]);
    }
    return (
        <>
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
            {
                allMainComments && allMainComments.map(
                    (comment) => 
                        (
                            <div key={comment.id} className="mb-2">
                                <CommentItem
                                    mainComment={comment}
                                    subcommentCount={comment.subcomment_count}
                                    replyComment={handleAddInputComment}
                                />
                                <div className="max-w-md">
                                    <div className="pl-24">
                                        <div className="border-l-2 border-gray-400">
                                            {
                                                position === comment.id && inputReplyComment
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                )
            }
        </>
    )
}