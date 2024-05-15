import ContentMainDetailPost from "@/app/ui/post/detail/content";
// import {
//     TheBestViewPost,
//     ManyViewsPosts
// } from "@/app/ui/post/detail/posts";

import { 
    ContentMainDetailPostSkeleton, 
    ManyViewsPostsSkeleton, 
    TheBestViewPostSkeleton 
} from "@/app/ui/post/skeletons-post";
import { auth } from "@/auth";
import { User } from "@/helpers/definitions";
import { getUserByEmail } from "@/lib/actions-user";
// import { getAllMainComments } from "@/lib/data-comment";
import { 
    // fetchManyViewsEachPost,
    // fetchManyViewsPosts,
    // fetchNewPostRelated,
    fetchPostBySlug, 
    fetchPostCategoryById 
} from "@/lib/data-post";
import { Suspense } from "react";
import CommentPart from "@/app/ui/post/detail/comment";
import { user } from "@/configs/constants";
import { PostContextProvider } from "@/app/store/post-context";
import { getAuthorOfPost } from "@/lib/data-user";

export default async function Page({ 
    params
} : { 
    params: { slug: string }
}) {
    const slug = decodeURIComponent(params.slug);
    const [session, post] = await [
        await auth(), 
        await fetchPostBySlug(slug)
    ];
    if(!post) return;
    const [
        category, 
        // relatedPosts, 
        author,
        userInfo,
        // similarPosts,
        // manyViewsPosts
    ] = await Promise.all([
        await fetchPostCategoryById(post.post_type_id),
        // await fetchNewPostRelated(post.post_type_id),
        await getAuthorOfPost(post.author_id) as User,
        await getUserByEmail(session?.user?.email!) as User
        // await fetchManyViewsEachPost(post.post_type_id, 4),
        // await fetchManyViewsPosts(4)
    ]);
    
    return (
        <>
            {/* Main */}
            <PostContextProvider slug={slug}>
                <div className="grid grid-cols-3 gap-3">
                    <Suspense fallback={<ContentMainDetailPostSkeleton/>}>
                        <ContentMainDetailPost 
                            // relatedPosts={relatedPosts} 
                            author={author}
                            category={category} 
                            post={post}
                        />
                    </Suspense>
                    <Suspense fallback={<ManyViewsPostsSkeleton/>}>
                        {/* <ManyViewsPosts similarPosts={similarPosts}/> */}
                    </Suspense>
                </div>
                <hr className="w-full h-1 mx-auto my-12 bg-gray-300 border-0 rounded md:my-8 dark:bg-gray-300"/>
                
                <div className="grid grid-cols-3 gap-3 mt-5 pt-6">
                    {/* Comment */}
                    <div className="col-start-1 col-end-3">
                        <CommentPart
                            userInfo={userInfo}
                        />
                    </div>
                    {/* Posts with other topics*/}
                    <Suspense fallback={<TheBestViewPostSkeleton/>}>
                        {/* <TheBestViewPost manyViewsPosts={manyViewsPosts}/> */}
                    </Suspense>
                </div>
            </PostContextProvider>
        </>
    )
}