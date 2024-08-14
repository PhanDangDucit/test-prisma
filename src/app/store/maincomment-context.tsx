"use client"
import { TCommentWithUser } from "@/helpers/definitions";
import { sortMainComments } from "@/utils/comment.util";
import { createContext, useContext, useEffect, useState } from "react";

export type MainCommentContextProvider = {
    mainComments: TCommentWithUser[],
    setMainComments: React.Dispatch<React.SetStateAction<TCommentWithUser[]>>
}

export const MainCommentContext = createContext<MainCommentContextProvider|{}>({});

export const MainCommentContextProvider = function({
    children,
    postId
}:{
    children:React.ReactNode,
    postId: number
}) {
    const [mainComments, setMainComments] = useState<TCommentWithUser[]>();
    useEffect(
        () => {
            setTimeout(function() {
                const result =  fetch(`http://localhost:3000/api/comments/main-comments?post-id=${postId}`, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                result
                    .then(res => res.json())
                    .then((arr) => {
                        setMainComments(sortMainComments(JSON.parse(arr)));
                    })
                    .catch(error => console.log(`Get main comment is failed!`));
            }, 1000)
        }, [postId]
    )

    return (
        <MainCommentContext.Provider
            value={{
                mainComments,
                setMainComments
            }}>
            {children}
        </MainCommentContext.Provider>
    )
};


 // ---> Create a individual cope
export function useMainCommentsContext () {
    const context = useContext(MainCommentContext) as MainCommentContextProvider;
    if(!context) {
        throw new Error ("Subcomments context in subcomment-context file isn't exist!");
    }
    return context;
}