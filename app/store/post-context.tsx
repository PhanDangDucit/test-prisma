"use client"
import { PostType } from "@/helpers/definitions";
import { createContext, useContext, useEffect, useState } from "react";

export type PostContextProvider = {
    post: PostType,
    setPost: React.Dispatch<React.SetStateAction<PostType>>
}

export const PostContext = createContext<PostType|{}>({});

export const PostContextProvider = function({
    children,
    slug
}:{
    children:React.ReactNode,
    slug:string
}) {
    // const getPost = () => {
    //     let post:PostType;
    //     const result = fetch(`http://localhost:3000/api/posts/post?slug=${slug}`, {
    //         method: "get",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     result
    //         .then(res => res.json())
    //         .then((post) => {
    //             post = JSON.parse(post);
    //             console.log(post);
    //         })
    //         .catch(error => console.log(`Get post is failed!`));
    //     return post!;
    // }
    // const [post, setPost] = useState<PostType>(getPost());
    
    const [post, setPost] = useState<PostType>();

    useEffect(
        () => {
            const result =  fetch(`http://localhost:3000/api/posts/post?slug=${slug}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            result
                .then(res => res.json())
                .then((post) => {
                    console.log("post from post-context::", JSON.parse(post));
                    setPost(JSON.parse(post));
                })
                .catch(error => console.log(`Get post is failed!`));
        }, [slug]
    )

    return (
        <PostContext.Provider
            value={{
                post,
                setPost
            }}
        >
            {children}
        </PostContext.Provider>
    )
};


 // ---> Create a individual cope
export function usePostContext () {
    const context = useContext(PostContext) as PostContextProvider;
    if(!context) {
        throw new Error ("Post context in subcomment-context file isn't exist!");
    }
    return context;
}