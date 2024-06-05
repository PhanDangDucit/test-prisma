
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { PostType } from "@/helpers/definitions";
import { processContentAddition } from "@/utils/posts.util";
import conan from "@/public/conan.jpg";
import { Suspense } from "react";
import { 
    LatestPostMarketingSkeleton,
    LatestPostTechSkeleton,
    LatestPostBusinessSkeleton
} from "@/app/ui/home/skeletons-home";
import { formatDateFollowHour } from "@/utils/functions";
import { getOnePost } from "@/lib/data-post";

export default async function LatestPost() {
    const datas = await Promise.all([
        getOnePost<PostType>(1),
        getOnePost<PostType>(2),
        getOnePost<PostType>(3),
    ]);
    // console.log("datas::", datas);
    if(!datas) return;
    const techPost = datas[0]![0];
    const marketingPost = datas[1]![0];
    const businessPost = datas[2]![0];
    // console.log("1::", techPost)
    // console.log("2::", marketingPost)
    // console.log("3::", businessPost)

    return (
        <>
            <h1 className="my-5 text-orange-400 text-4xl border-b-2 border-orange-200 inline-block">New Posts</h1>
            <div className="grid grid-cols-3 gap-8 justify-between container">
                <Suspense fallback={<LatestPostTechSkeleton/>}>
                    <LatestPostTech techPost={techPost}/>
                </Suspense>
                <div className="grid gap-3 grid-cols-1">
                    <Suspense fallback={<LatestPostMarketingSkeleton/>}>
                        <LatestPostMarketing marketingPost={marketingPost}/>
                    </Suspense>
                    <Suspense fallback={<LatestPostBusinessSkeleton/>}>
                        <LatestPostBusiness businessPost={businessPost}/>
                    </Suspense>
                </div>
           </div>
        </>
    )
}

export async function LatestPostTech({techPost}: {techPost:PostType}) {
    if(!techPost) return;
    return (
        <div className="col-start-1 col-end-3 card bg-gray-100 shadow-xl relative px-10 pt-10 p-4">
                <figure className="px-10 pt-10 p-4 h-[520px] w-[700px] relative m-auto">
                    <Image
                        className="rounded-2xl object-cover"
                        src={techPost.thumbnail || conan}
                        // height={420}
                        // width={100}
                        fill={true}
                        alt="latest-tech-techPost"
                        priority
                    />
                </figure>
                <p className="ml-16 mt-2">{moment(techPost.created_at).startOf('hour').fromNow()}</p>
                <div className="card-body items-center text-center">
                    <Link 
                        href={`/blog/${techPost.slug}/`} 
                        className="hover:underline"
                        >
                        <h2 className="card-title text-gray-600">{techPost.title}</h2>
                    </Link>
                    <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: processContentAddition(techPost.content, 180)}}/>
                </div>
                <Link href={`/blog/${techPost.slug}/`} className="mx-auto absolute inset-0">{''}</Link>
        </div>
    )
}

// Above
export async function LatestPostMarketing({
    marketingPost
}: {
    marketingPost: PostType
}) {
    if(!marketingPost) return;
    return (
        <div className="card bg-gray-100 shadow-xl relative px-10 pt-10 p-4">
            <figure className="px-10 pt-10 p-4 h-[182px] w-[340px] relative m-auto">
                <Image
                    className="rounded-xl object-cover"
                    src={marketingPost?.thumbnail || conan}
                    // height={182}
                    // width={304}
                    fill
                    alt="marketing post"
                />
            </figure>
            <div className="flex flex-col items-center">
                    <h2 className="card-title text-gray-600 text-base">{marketingPost?.title}</h2>
                <div className="text-gray-500 text-sm"  dangerouslySetInnerHTML={{ __html:  processContentAddition(marketingPost?.content, 80)}}/>
            </div>
            <p className="ml-3 text-gray-400 text-xs">{moment(marketingPost?.created_at).startOf('hour').fromNow()}</p>
            <Link href={`/blog/${marketingPost?.slug}/`} className="absolute inset-0">{''}</Link>
        </div>
    )
}

// below
export async function LatestPostBusiness({
    businessPost
} : {
    businessPost:PostType
}) {
    if(!businessPost) return;
    return (
        <div className="card bg-gray-100 shadow-xl relative px-10 pt-10 p-4">
            <figure className="px-10 pt-10 p-4 h-[182px] w-[340px] relative m-auto">
                <Image
                    className="rounded-xl object-cover"
                    src={businessPost.thumbnail || conan}
                    // height={182}
                    // width={304}
                    fill={true}
                    alt="business-post"
                    priority
                />
            </figure>
            <div className="flex flex-col items-center">
                <h2 className="card-title text-gray-600 text-base">{businessPost.title}</h2>
                <div className="text-gray-500 text-sm"  dangerouslySetInnerHTML={{ __html: processContentAddition(businessPost.content, 80)}}/>
            </div>
            <p className="ml-3 text-gray-400 text-xs">{formatDateFollowHour(businessPost?.created_at)}</p>
            <Link href={`/blog/${businessPost.slug}/`} className="absolute inset-0">{''}</Link>
        </div>
    )
}
