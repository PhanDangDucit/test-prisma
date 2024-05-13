"use client"
import { PostType } from "@/helpers/definitions";
import { createContext, useContext, useState } from "react";

export type PostContextProvider = {
    post: PostType,
    setPost: React.Dispatch<React.SetStateAction<PostType>>
}

export const PostContext = createContext<PostType|{}>({});

export const PostContextProvider = function({
    children
}:{
    children:React.ReactNode
}) {

    const [mainComments, setMainComments] = useState<PostType>();
    // console.log("typeof setSubcommentsWithParentIdList the first::", setSubcommentsWithParentIdList)

    return (
        <PostContext.Provider
            value={{
                mainComments,
                setMainComments
            }}
        >
            {children}
        </PostContext.Provider>
    )
};


 // ---> Create a individual cope
export function useMainCommentsContext () {
    const context = useContext(PostContext) as PostContextProvider;
    // console.log("typeof setSubcommentsWithParentIdList the two::", context.setMainComments)
    if(!context) {
        throw new Error ("Subcomments context in subcomment-context file isn't exist!");
    }
    return context;
}