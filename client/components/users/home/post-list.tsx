"use client"
import Image from "next/image";
import { useRef, useState } from "react";

export function PostList ({postsInit}: {postsInit: PostsList}) {

    const [posts, setPosts] = useState<PostsList>(postsInit);

    return (
        <div>
            {
                posts.map(post => (
                    <div key={post.id} className="h-96 w-96">
                        <Image 
                            src={post.post_thumbnail}
                            width={300}
                            height={300}
                            className=""
                            alt={post.post_content}
                        />
                        <p>{post.post_title}</p>
                    </div>
                ))
            }
        </div>
    )
}