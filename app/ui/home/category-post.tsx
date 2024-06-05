import { PostType } from "@/helpers/definitions";
import { getManyPost } from "@/lib/data-post";
// import Image from "next/image";
// import moment from "moment";
import Link from "next/link";


export default async function CategoryPost() {
    const datas = await Promise.all([
        getManyPost<PostType>(2, 3, 'created_at'),
        getManyPost<PostType>(3, 3, 'created_at'),
        getManyPost<PostType>(4, 3, 'created_at'),
    ]);
    // console.log("data::>>", datas);
    const politicalPosts = datas[0];
    const marketingPosts = datas[1];
    const businessPosts = datas[2];
    return (
        <>
            <h1 className="my-5 text-orange-400 text-4xl border-b-2 border-orange-200 inline-block">Categories</h1>
            <div className="flex justify-between w-100 container my-5">
                {/* Political */}
                <div className="p-4 w-1/4">
                    <div className="flex justify-between">
                        <h1 className="text-gray-600 font-medium underline">Political</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="w-6 h-6 text-gray-400 hover:text-gray-100 cursor-pointer"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </div>
                    <div className="">
                        {
                            politicalPosts && politicalPosts.map((post)=>(
                                <Link href={`blog/${post.slug}`} 
                                    className="hover:underline"
                                    key={post.id}
                                >
                                    <h2 className="mt-2 text-sm">{post.title}</h2>
                                </Link>
                            ))
                        }
                    </div>
                </div>     
                {/* Maketing */}
                <div className="p-4 w-1/4">
                    <div className="flex justify-between">
                        <h1 className="text-gray-600 font-medium underline">Marketing</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="w-6 h-6 text-gray-400 hover:text-gray-100 cursor-pointer"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </div>
                    <div className="">
                        {
                            marketingPosts && marketingPosts.map((post)=>(
                                <Link href={`blog/${post.slug}`} 
                                    className="hover:underline"
                                    key={post.id}
                                >
                                    <h2 className="mt-2 text-sm">{post.title}</h2>
                                </Link>
                            ))
                        }
                    </div>
                </div>        
                {/* Business */}
                <div className="p-4 w-1/4">
                    <div className="flex justify-between">
                        <h1 className="text-gray-600 font-medium underline">Business</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="w-6 h-6 text-gray-400 hover:text-gray-100 cursor-pointer"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </div>
                    <div className="">
                        {
                            businessPosts && businessPosts.map((post)=>(
                                <Link href={`blog/${post.slug}`} 
                                    className="hover:underline"
                                    key={post.id}
                                >
                                    <h2 className="mt-2 text-sm">{post.title}</h2>
                                </Link>
                            ))
                        }
                    </div>
                </div>                
           </div>
        </>
    )
}