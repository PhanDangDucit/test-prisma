import { 
    fetchCategoriesIdByTypeName,
    fetchLatestPostsForPostType, 
    fetchManyViewsEachPost 
} from "@/lib/posts/data-post";
import { processContentAddition } from "@/utils/posts.util";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const Page = async ({
    params
}: {
    params: {
        category: string
    }
}) => {
    const categories = await fetchCategoriesIdByTypeName(params.category);
    if(!categories) return;
    const viewPosts = await fetchManyViewsEachPost(categories.id, 9);
    const latestPosts = await fetchLatestPostsForPostType(categories.id, 10);
    return (
        <>
            <h1 className="my-5 text-orange-400 text-4xl border-b-2 border-orange-200 inline-block uppercase">{params.category}</h1>
            {/* Many view posts */}
            <div className="grid grid-cols-3 gap-4">
                {
                    viewPosts.map((post)=> post && (
                        <div className="card bg-gray-100 shadow-xl relative px-10 pt-10 p-4" key={post.id}>
                        <figure className="px-10 pt-10 p-4 h-[182px] w-[340px] relative m-auto">
                            <Image
                                className="rounded-xl object-cover"
                                src={post?.thumbnail || ''}
                                // height={182}
                                // width={304}
                                fill
                                alt="marketing post"
                            />
                        </figure>
                        <div className="flex flex-col items-center">
                                <h2 className="card-title text-gray-600 text-base">{post?.title}</h2>
                            <div className="text-gray-500 text-sm"  dangerouslySetInnerHTML={{ __html:  processContentAddition(post?.content, 80)}}/>
                        </div>
                        <p className="ml-3 text-gray-400 text-xs">{moment(post?.created_at).startOf('hour').fromNow()}</p>
                        <Link href={`/blog/${post?.slug}/`} className="absolute inset-0">{''}</Link>
                    </div>
                    ))
                }
            </div>
            <div className="grid grid-cols-3 gap-4 mt-12">
                {/* Latest posts */}
                <div className="col-start-1 col-end-3 ">
                    {
                        latestPosts.map((post)=> post && (
                            <div className="flex rounded-xl mt-4  border-2 border-orange-300 relative" key={post.id}>
                                <div className="relative w-full h-56">
                                    <Image 
                                        className="object-cover rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
                                        src={post.thumbnail!}
                                        fill
                                        priority
                                        alt="latest-post"
                                    />
                                </div>
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                                    <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: processContentAddition(post.content, 180)}}/>
                                </div>
                                <Link href={`/blog/${post.slug}/`} className="absolute inset-0"></Link>
                            </div>
                        ))
                    }
                </div>
                {/* Ads */}
                
            </div>
        </>
    );
}
 
export default Page;