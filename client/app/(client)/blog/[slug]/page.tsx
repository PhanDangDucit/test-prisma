import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/actions-user";

import { Suspense } from "react";
import { PostContextProvider } from "@/app/store/post-context";
import { getAuthorOfPost } from "@/lib/data-user";
import ContentMainDetailPost from "@/components/users/post/detail/content";
import CommentPart from "@/components/users/post/detail/comment";
import { fetchPostBySlug, fetchPostCategoryById } from "@/lib/posts/posts.lib";
import { ContentMainDetailPostSkeleton, ManyViewsPostsSkeleton, TheBestViewPostSkeleton } from "@/components/users/post/skeletons-post";

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
        author,
        userInfo,
    ] = await Promise.all([
        await fetchPostCategoryById(post.post_type_id),
        await getAuthorOfPost(post.author_id) as User,
        await getUserByEmail(session?.user?.email!) as User
    ]);
    
    return (
        <>
            {/* Main */}
            <PostContextProvider slug={slug}>
                <div className="grid grid-cols-3 gap-3">
                    <Suspense fallback={<ContentMainDetailPostSkeleton/>}>
                        <ContentMainDetailPost
                            author={author}
                            category={category} 
                            post={post}
                        />
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
                </div>
            </PostContextProvider>
        </>
    )
}