
import { getPosts } from "@/lib/posts/posts.lib";
import { processContentAddition } from "@/utils/posts.util";
import moment from "moment";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";

export default async function Page  ({
    params
}: {
    params: {
        category: string
    }
}) {
    const posts = await getPosts(params.category) ?? [];
    
    return (
        <>
            <h1 className="my-5 text-orange-400 text-4xl border-b-2 border-orange-200 inline-block uppercase"># {params.category}</h1>
            <div className="flex flex-col items-center gap-4">
                {
                    posts.map(post => post && (
                        <Link 
                            href={`/blog/${post?.slug}/`} 
                            className="underline"
                            key={nanoid()}
                        >
                            {post?.title ?? ''}
                        </Link>
                    ))
                }
            </div>
        </>
    );
}