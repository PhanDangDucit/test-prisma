import { 
    getPostManyViews
} from "@/lib/data-post";

import { processContentAddition } from "@/utils/posts.util";

import { images } from "@/public/images";
import Image from "next/image";
import Link from "next/link";

export async function ContentCategoryClient() {
    
    const posts = await getPostManyViews();

    return (
        <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="col-start-1 col-end-3 ">
                {
                    posts && posts.map((post)=> post && (
                        <div className="flex rounded-xl mt-4  border-2 border-orange-300 relative" key={post.id}>
                            <div className="relative w-full h-56">
                                <Image 
                                    className="object-cover rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
                                    src={ post.thumbnail ?? images.imageStroke }
                                    fill
                                    alt="latest-post"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                                <div 
                                    className="text-gray-500" 
                                    dangerouslySetInnerHTML={{ __html: processContentAddition(post.content, 180)}}
                                />
                            </div>
                            <Link href={`/blog/${post.slug}/`} className="absolute inset-0"></Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}