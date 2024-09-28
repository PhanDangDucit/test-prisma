"use client"
import { useRef, useState } from "react";

export function PostList ({postsInit}: {postsInit: PostsList}) {
    const containerRef = useRef(null);
    const [posts, setPosts] = useState<PostsList>(postsInit);


    return (
        <div>
            <div>
                <div className="h-96 w-96">Hello</div>
                <div className="h-96 w-96">Hello</div>
                <div className="h-96 w-96">Hello</div>
                <div className="h-96 w-96">Hello</div>
                <div className="h-96 w-96">Hello</div>
                <div className="h-96 w-96">Hello</div>
            </div>

            <div ref={containerRef}>loading ...</div>
        </div>
    )
}