import Link from "next/link";
import Image from "next/image";
import { FormChangeIsShowPost } from "./form";

const PostResult = ({
    posts,
}: {
    posts:PostType[],
}) => {
    return (
        <div className="border-[1px] border-gray-100 w-3/4 mx-auto m-12 bg-white">
            { 
                (posts.length > 0) ? posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex justify-between bg-white border items-center border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div
                            className="relative mb-2 flex flex-col items-center md:flex-row md:max-w-xl"
                        >
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                            </div>
                            <Link href={`/manage-blog/posts/${post.slug}/edit`} className="absolute inset-0">{''}</Link>
                        </div>
                    </div>
                )) : (
                    <div className="w-full h-12 mt-10">
                        <h1 className="text-center text-sm text-orange-500">No Post!</h1>
                    </div>
                )
            }
        </div>
    );
}
 
export default PostResult;