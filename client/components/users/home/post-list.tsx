"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function PostList ({postsInit}: {postsInit: PostsList}) {

    const [posts, setPosts] = useState<PostsList>(postsInit);

    return (
        <div className="flex flex-col items-center">
            {
                posts.map(post => (
                    <div key={post.id} className="h-96 w-96">
                        <Image 
                            src={post.thumbnail}
                            width={300}
                            height={300}
                            className=""
                            alt={post.title}
                        />
                        <Link
                            href={`/blog/${post.slug}`}
                        >
                            {post.title}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}