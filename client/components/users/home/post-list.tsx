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
                    <div key={post.id} className="my-5">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="underline"
                        >
                            {post.title}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}