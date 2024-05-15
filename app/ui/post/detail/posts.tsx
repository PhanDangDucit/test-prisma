import { PostType } from "@/helpers/definitions";
import { processContentAddition } from "@/utils/posts.util";
import Image from "next/image";
import Link from "next/link";
import { fetchManyViewsPosts, fetchManyViewsEachPost } from "@/lib/data-post";
import icon from "@/public/tree.jpg";

export const PostRelated = ({
    posts
}:{
    posts:PostType[]
}) => {
    console.log("PostRelated is re-render!");
    return (
        <div className="bg-gray-100 p-4 mt-12">
            {
                posts && posts.map((post, index:number)=> (
                    <div key={post.id}>
                        <div className="flex p-4 bg-white rounded-2xl relative">
                            <div className="w-48 h-48 relative">
                                <Image
                                    src={post.thumbnail || icon}
                                    // width={240}
                                    // height={240}
                                    fill
                                    alt="thumnail"
                                    priority
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-2">
                                <h3 className="text-gray-600 mb-3 font-medium">{post.title}</h3>
                                <div
                                    className="text-gray-500" 
                                    dangerouslySetInnerHTML={{__html: processContentAddition(post.content, 100)}}
                                />
                            </div>
                            <Link href={`/blog/${post.slug}`} key={post.id} className="absolute inset-0">{''}</Link>
                        </div>
                        {
                            index % 2 == 0 && <hr className="w-3/4 h-1 mx-auto my-1 bg-gray-300 border-0 rounded md:my-1 dark:bg-gray-300"/>
                        }
                    </div>
                ))
            }
        </div>
    );
}


export const TheBestViewPost = async ({
    manyViewsPosts
}:{
    manyViewsPosts:PostType[]
}) => {
    console.log("TheBestViewPost component is re-rendered!");
    return (
        <div className="">
            <h1 className="my-5 text-orange-600 text-2xl border-b-2 border-orange-200 inline-block p-1">More</h1>
            { 
                manyViewsPosts && manyViewsPosts.map((post) => (
                    <div
                        key={post.id}
                        className="relative mb-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div className="w-24 h-24 relative">
                            <Image
                                src={post.thumbnail || icon}
                                // width={100}
                                // height={120}
                                fill
                                alt="thumnail"
                                className="object-cover p-2"
                                priority
                            />
                        </div>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                        </div>
                        <Link href={`/blog/${post.slug}`} className="absolute inset-0">{''}</Link>
                    </div>
                ))
            }
        </div>
    );
}


export const ManyViewsPosts = async ({
    similarPosts
}:{
    similarPosts:PostType[]
}) => {
    console.log("ManyViewsPosts component is re-rendered!");
    return (
        <div className="">
            <h1 className="my-5 text-orange-600 text-2xl border-b-2 border-orange-200 inline-block p-1">Popular Post</h1>
            { 
                similarPosts && similarPosts.map((post) => (
                    <div 
                        key={post.id}
                        className="relative mb-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div className="relative w-24 h-24">
                            <Image
                                src={post.thumbnail || icon}
                                // width={100}
                                // height={120}
                                fill
                                alt="thumnail for post"
                                className="object-cover p-2"
                                priority
                            />
                        </div>
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                        </div>
                        <Link href={`/blog/${post.slug}`} className="absolute inset-0">{''}</Link>
                    </div>
                ))
            }
        </div>
    );
}