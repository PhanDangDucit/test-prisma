'use client'
import { createNewComment } from "@/lib/actions-comment";
import { CornerDownRight } from "lucide-react";
import Image from "next/image";
import React, { memo, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import conan from "@/public/conan.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDebouncedCallback } from "use-debounce";
import { nanoid } from 'nanoid';
import { processStringContentAddition } from "@/utils/posts.util";
import { SubcommentsProvider, SubcommentsWithParentId, useSubcommentsContext } from "@/app/store/subcomment-context";
import { MainCommentContextProvider, useMainCommentsContext } from "@/app/store/maincomment-context";
import { sortMainComments } from "@/utils/comment.util";
import { usePostContext } from "@/app/store/post-context";
import { TComment, TCommentWithUser } from "@/types";

export function ButtonSubmitNewMainComment ({
    userId
}:{
    userId: number
}) {
    const statusForm = useFormStatus();

    // open popup if user isn't logged in
    const handleUnauthenticatedUser = useDebouncedCallback(() => {
        toast("You need to log in to comment !");
    }, 1000)
    
    // handleSubmit function is used to submit "newMainComment" form
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const input:HTMLInputElement|null = document.querySelector("#comment-main");
        
        // check if user is logged in
        if(!userId) {
            e.preventDefault();
            handleUnauthenticatedUser();
            return;
        
        // length of comment must greater than 0 (user must type least a character)
        } else if(input?.value.length == 0) {
            e.preventDefault();
        }
    }

    return (
        <button
            type="submit"
            id="btn-submit-main-comment"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            onClick={e => handleSubmit(e)}
            disabled={statusForm.pending}
        >
            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send MainComment</span>
        </button>
    )
}

type NewCommentMainProps = {
    userId: number,
    parentId: number,
    userInfo:User
}

export const NewCommentMain = memo(function NewCommentMain({
    userId,
    parentId,
    userInfo
} : NewCommentMainProps){
    const {
        mainComments,
        setMainComments
    } = useMainCommentsContext();

    const {post, setPost} = usePostContext();

    const initialState = { message: "", errors: {}, data: {}};
    const createCommentWithId = createNewComment.bind(null, post.id, userId, parentId);
    const [state, dispatch] = useFormState(createCommentWithId, initialState);

    // Add content of comment when user types text.
    const handleChangeInputValue = () => {
        const input:HTMLInputElement|null = document.querySelector("#comment-main");
        const divToExpendHeight:HTMLElement|null = document.querySelector("#div-comment-main");
        if(input && divToExpendHeight) {
            input.value = divToExpendHeight.innerText;
        }
    }
    
    // use useEffect with dependency is state
        // this dependency trigger operations inside body of userEffect hook when error propeties of state is changed
        // when validate data through submiting form at newMainComment.
    useEffect(() => {
        // Check if state is error
            // if error doen't exists, client will clean value of input
        if(state.errors) {
            const input:HTMLInputElement|null = document.querySelector("#comment-main");
            const divToExpendHeight:HTMLElement|null = document.querySelector("#div-comment-main");
            if(input && divToExpendHeight) {
                input.value = '';
                divToExpendHeight.innerText = '';
            }
        }

        // Check if state is error
            // if error doen't exists, client will update UI
            // this operation is only happening on client
        if(!state.errors?.content) {
            if(state?.data?.comment) {
                const comment:Partial<TComment> =  state.data.comment!;
                delete comment.user_id;
                delete comment.updated_at;
                const newMainComment = {
                    ...comment,
                    user:{
                        avatar:userInfo.avatar, 
                        username:userInfo.username
                    }
                } as TCommentWithUser;
                setMainComments(sortMainComments([...mainComments, newMainComment]));
                setPost({
                    ...post, 
                    comment_count: post.comment_count + 1
                });
                delete state?.data?.comment;
            }
        }
    }, [state, mainComments, post, setMainComments, setPost, userInfo.avatar, userInfo.username]);

    return (
        <form className="p-4" action={dispatch}>
            <label htmlFor="comment-main" className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <input
                    id="comment-main"
                    name="content"
                    placeholder="Your message..." 
                    defaultValue={''}
                    hidden
                />
                <div
                    className="block min-h-12 mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    contentEditable={true}
                    role="textbox"
                    id="div-comment-main"
                    onKeyUp={handleChangeInputValue}
                    title="new main comment"
                ></div>
                <ButtonSubmitNewMainComment userId={userId}/>
            </div>
        </form>
    );
})

export function ButtonSubmitNewSubcomment({
    userId, 
    value,
}:{
    userId:number, 
    value: string,
}) {
    const statusSubmit = useFormStatus();

    // This function is called when user logged in or authenticated
        // user submit a form which has least a character
    const hanldeIsAuthUser = useDebouncedCallback(() => {
        const input:HTMLInputElement|null = document.querySelector("#subcomment");
        if(input) {
            input.value = value + " ";
        }
        toast("You need to log in to comment !");
    }, 1000)

    // handleSubmit handle logic of form submission
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(!userId) {
            e.preventDefault();
            hanldeIsAuthUser();
            return;
        }
    }
    return (
        <button 
            type="submit" 
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            onClick={e => handleSubmit(e)}
            disabled={statusSubmit.pending}
        >
            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send message</span>
        </button>
    )
}
export function InputReplyComment({
    userInfo,
    value,
    postId,
    parentId,
    handleAddSubcomment
}:{
    userInfo: User,
    postId: number,
    value: string,
    parentId: number,
    handleAddSubcomment:(newSubcomment: TCommentWithUser) => void,
}) {
    const initialState = { message: "", errors: {}, data: {}};
    const createCommentWithId = createNewComment.bind(null, postId, userInfo.id, parentId);
    const [state, dispatch] = useFormState(createCommentWithId, initialState);
    const {
        subcommentsWithParentIdList, 
        setSubcommentsWithParentIdList
    } = useSubcommentsContext();
    
    // "useEffect" hook is used to handle value of input which is used to user type their own comment
    useEffect(
        () => {
            const input:HTMLInputElement|null = document.querySelector("#subcomment");
            if(input) {
                input.value = value + " ";
                input.focus();
            }
        }, [value]
    )
    
    useEffect(() => {
        // Check if state is error
            // if error doen't exists, client will update UI
            // this operation is only happening on client
        if(!state.errors?.content) {
            if(state?.data?.comment) {
                const comment:Partial<TComment> = state.data.comment!;
                // two function below initializated at "CommentPart" component
                delete comment.user_id;
                delete comment.updated_at;
                const newSubcomment = {
                    ...comment,
                    user:{
                        avatar:userInfo.avatar,
                        username:userInfo.username
                    }
                } as TCommentWithUser;
                const mainCommentId = newSubcomment.parent_id;

                // If Maincomment in subcommentsWithParentIdList is existed
                    // return object in subcommentsWithParentIdList if it is existed 
                console.log("cut subcommentsWithParentIdList::1", subcommentsWithParentIdList);
                const subcommentsWithParentId = subcommentsWithParentIdList.find(
                    (subcommentsWithParentId, index) => {
                        const prepare = mainCommentId == subcommentsWithParentId.parentId;
                        if(prepare) {
                            subcommentsWithParentIdList.splice(index, 1);
                            return true;
                        }
                    }
                )
                console.log("cut subcommentsWithParentIdList", subcommentsWithParentIdList);
                console.log("cut subcommentsWithParentId <--------->", subcommentsWithParentId);
                if(subcommentsWithParentId) {
                    setSubcommentsWithParentIdList([
                        ...subcommentsWithParentIdList,
                        {
                            parentId: mainCommentId!,
                            subcomments: [
                                ...subcommentsWithParentId.subcomments,
                                newSubcomment
                            ]
                        }
                    ])
                } else {
                    setSubcommentsWithParentIdList([
                        ...subcommentsWithParentIdList,
                        {
                            parentId: mainCommentId!,
                            subcomments: [newSubcomment]
                        }
                    ])
                }
                
                handleAddSubcomment(newSubcomment);
                delete state?.data?.comment;
            }
        }
    }, [state, handleAddSubcomment]);

    return (
        <>
            <form 
                className="ml-1"
                action={dispatch}
                id="form-submit-subcomment"
            >
                <label htmlFor="subcomment" className="sr-only">Your message</label>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <input
                        id="subcomment"
                        name="content"
                        // ref={inputRef}
                        className="block min-h-12 mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        defaultValue={`${value}` + " "}
                    />
                    <ButtonSubmitNewSubcomment 
                        userId={userInfo.id} 
                        value={value}
                    />
                </div>
            </form>
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
    const [isShowContentAddition, setIsShowContentAddition] = useState<boolean>(false);
    const handleShowContentAddition = () => {
        setIsShowContentAddition(true);
    }
    const contentLengthRequired = 200;
    return (
        <div>
            <div className="flex space-x-4 rtl:space-x-reverse py-4">
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
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {mainComment.user.username!}
                    </p>
                        {
                            mainComment.content.length < contentLengthRequired ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {mainComment.content}
                                </p>
                            ) : (
                                <>
                                    {
                                        isShowContentAddition ? (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {mainComment.content}
                                            </p>
                                        ) : (
                                            <>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {processStringContentAddition(mainComment.content, 200)}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={handleShowContentAddition}
                                                >
                                                    learn more
                                                </button>
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
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
                        src={subcomment.user.avatar ?? conan}
                        alt={subcomment.user.username ?? ""}
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

const CommentItem = memo(function CommentItem({
    subcommentCount,
    mainComment,
    replyComment,
}:{
    subcommentCount: number,
    mainComment: TCommentWithUser,
    replyComment: (commentListId: number, usernameReplyed:string) => void,
}) {
    console.log("Comment Item is re-rendered!");
    const mainCommentId:number = mainComment.id;
    const {
        subcommentsWithParentIdList, 
        setSubcommentsWithParentIdList
    } = useSubcommentsContext();

    const [isShowSubcomments, setShowSubcomments] = useState(false);
    const [subcommentsList, setSubcommentsList] = useState<SubcommentsWithParentId>();

    useEffect(() => {
        console.log("subcommentsWithParentIdList", subcommentsWithParentIdList);
        setSubcommentsList(subcommentsWithParentIdList.find(
            (subcommentsWithParentIdList) => mainComment.id == subcommentsWithParentIdList.parentId
        ))
    }, [subcommentsWithParentIdList])
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
        .then((arr) => {
                const subcommentsWithParentId = subcommentsWithParentIdList.find(
                    (subcommentsWithParentId, index) => {
                        // return mainCommentId == subcommentsWithParentId.parentId;

                        const prepare = mainCommentId == subcommentsWithParentId.parentId;
                        if(prepare) {
                            subcommentsWithParentIdList.splice(index, 1);
                            return true;
                        }
                    }
                )
                console.log("cut subcommentsWithParentIdList", subcommentsWithParentIdList);
                console.log("cut subcommentsWithParentId <--------->", subcommentsWithParentId);
                setSubcommentsWithParentIdList([
                    ...subcommentsWithParentIdList,
                    {
                        parentId: mainCommentId!,
                        subcomments: JSON.parse(arr)
                    }
                ])
            })
            .catch(error => console.log(`error`));
    }

    return (
        <div
            // className="max-w-md"
        >
            <MainComment
                mainComment={mainComment}
                replyComment={replyComment}
            />
            
            {/* List-subcomment */}
            {
                <div className="pl-24 mt-2">
                {
                    subcommentCount > 0 && !isShowSubcomments && (
                        <button 
                            type="button"
                            onClick={e => handleShowComment(e)}
                            className="flex my-4"
                        >
                            <CornerDownRight className="w-6 h-6"/>
                            <p>{subcommentCount} responses</p>
                        </button>
                    )
                }
                <>
                    {
                        isShowSubcomments && !subcommentsList && (
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
                        ) 
                    }
                    {
                        isShowSubcomments && subcommentsList && (
                            <>
                                {
                                    subcommentsList.subcomments.map((subcomment) => (
                                        <div
                                            className="border-l-2 border-gray-400" 
                                            key={nanoid()}
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
            </div>
            }
        </div>
    );
})

// Comment list
export function CommentList({
    userInfo,
} : {
    userInfo: User,
}) {
    const [inputReplyComment, setInputReplyComment] = useState<React.ReactNode[]>([]);
    const [position, setPosition] = useState<number>();
    const {
        mainComments
    } = useMainCommentsContext();
    const { post, setPost } = usePostContext();

    console.log("CommentList is re-rendered!");

    //handle add input comment when user click reply
    const handleAddInputReplyComment = 
    (
        commentId: number,
        usernameReplyed: string,
    ) => {
        setInputReplyComment([]);
        setPosition(commentId);
        setInputReplyComment([
            <div key={nanoid()}>
                <InputReplyComment
                    value={usernameReplyed}
                    userInfo={userInfo}
                    postId={post.id}
                    parentId={commentId}
                    handleAddSubcomment={handleAddSubcomment}
                />
            </div>
        ]);
    }

    // Add subcommets from input reply
    const handleAddSubcomment = (newSubcomment: TCommentWithUser) => {
        setInputReplyComment([]);
        setPost({
            ...post,
            comment_count: post.comment_count + 1
        });
        updateSubCommentCount(newSubcomment.parent_id!);
    }

    // Update subcomment count: O(n)
    const updateSubCommentCount = (parentId:number) => {
        const parentComment = mainComments.find((parentComment)=>{
            return parentComment.id == parentId;
        }) as TCommentWithUser;
        parentComment.subcomment_count ++;
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
                mainComments && mainComments.map(
                    (comment) =>
                       {
                        return (
                            <div key={comment.id} className="mb-2">
                                <CommentItem
                                    mainComment={comment}
                                    subcommentCount={comment.subcomment_count}
                                    replyComment={handleAddInputReplyComment}
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
                    }
                )
            }
        </>
    )
}

// CommentPart component
export default function CommentPart({
    userInfo,
} : {
    userInfo:User,
}) {
    const { post } = usePostContext();
    const [commentCount, setCommentCount] = useState<number>(0);
    useEffect(() => {
        if(!post) return;
        setCommentCount(post.comment_count);
    }, [post])

    if(!post) return;
    console.log("Comment Part is re-rendered!");
    
    return (
        <div>
            <h1 className="my-5 text-orange-600 text-2xl border-b-2 border-orange-200 inline-block p-1">Comments ({commentCount})</h1>
            <MainCommentContextProvider postId={post.id}>
                <NewCommentMain
                    userId={userInfo.id}
                    parentId={0}
                    userInfo={userInfo}
                />
                <SubcommentsProvider>
                    <CommentList
                        userInfo={userInfo}
                    />
                </SubcommentsProvider>
            </MainCommentContextProvider>
        </div>
    )
}