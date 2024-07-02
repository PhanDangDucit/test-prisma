import { fetchManyViewsEachPost } from "@/lib/data-post"
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { PostType } from "@/helpers/definitions";
import { processContentAddition } from "@/utils/posts.util";
import conan from "@/public/conan.jpg";

export default async function TechPost() {
    const posts = await fetchManyViewsEachPost(1, 3);
    // if(!posts) return;
    // if(posts.length == 0) return; 
    console.log("posts: " + posts);
    const time = (post:PostType) => {
        return moment(post.updated_at).endOf('day').fromNow();
    }
    return (
        <>
            <h1 className="my-5 text-orange-400 text-4xl border-b-2 border-orange-200 inline-block">Technology</h1>
            <div className="grid grid-cols-3 gap-4">
                    {
                        posts && posts.map(
                            (post) =>  post && (
                                <div className="card bg-gray-100 shadow-xl relative" key={post?.id}>
                                    {/* <div className="border-l-2 border-gray-300 w-1 h-80 -translate-x-1 absolute top-0 left-0"></div> */}
                                    <figure className="w-full h-[260px] relative">
                                        <Image
                                            className="shadow-xl object-cover"
                                            src={post.thumbnail || conan}
                                            // height={400}
                                            // width={400}
                                            fill
                                            priority
                                            alt="tech post many views"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 
                                            className="card-title text-gray-600"
                                        >
                                            {post.title}
                                        </h2>
                                        <div dangerouslySetInnerHTML={{ __html: processContentAddition(post?.content, 80)}}/>
                                        <p>{time(post)}</p>
                                    </div>
                                    <Link className="absolute inset-0" href={`blog/${post.slug}`} key={post.id}></Link>
                                </div>
                            )
                        )
                    }
               </div>
        </>
    )
}