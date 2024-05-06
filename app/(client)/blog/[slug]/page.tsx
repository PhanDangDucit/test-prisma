import CommentList, {
    NewCommentMain
} from "@/app/ui/post/detail/comment";
import ContentMainDetailPost from "@/app/ui/post/detail/content";
import {
    TheBestViewPost,
    ManyViewsPosts
} from "@/app/ui/post/detail/posts";

import { 
    CommentListSkeleton, 
    NewCommentMainSkeleton,
    ContentMainDetailPostSkeleton, 
    ManyViewsPostsSkeleton, 
    TheBestViewPostSkeleton 
} from "@/app/ui/post/skeletons-post";
import { auth } from "@/auth";
import { User } from "@/helpers/definitions";
import { getUserByEmail, getUserById } from "@/lib/actions-user";
import { getAllMainComments } from "@/lib/data-comment";
import { 
    fetchPostBySlug, 
    fetchPostCategoryById 
} from "@/lib/data-post";
import { Suspense } from "react";
import { nanoid } from "nanoid";
export default async function Page({ 
    params 
} : { 
    params: { slug: string }
}) {
    const slug = decodeURIComponent(params.slug);
    const post = await fetchPostBySlug(slug);
    if(!post) return;
    const postId = post.id;
    const [category, session, allMainComments] = await Promise.all([
        await fetchPostCategoryById(post.post_type_id),
        await auth(),
        await getAllMainComments(postId)
    ]);
    
    const email = session?.user?.email;
    let user = {
        id: 0
    };
    
    // check user logging to comment
    if(email) {
        user = await getUserByEmail(email) as User;
    }

    allMainComments.sort((firstComment, secondComment) => Number(secondComment.created_at) - Number(firstComment.created_at));
    console.log("all main comment::", allMainComments);
    return (
        <>
            {/* Main */}
            <div className="grid grid-cols-3 gap-3">
                <Suspense fallback={<ContentMainDetailPostSkeleton/>}>
                    <ContentMainDetailPost category={category} post={post}/>
                </Suspense>
                <Suspense fallback={<ManyViewsPostsSkeleton/>}>
                    <ManyViewsPosts postTypeId={post.post_type_id}/>
                </Suspense>
            </div>
            <hr className="w-full h-1 mx-auto my-12 bg-gray-300 border-0 rounded md:my-8 dark:bg-gray-300"/>
            
            <div className="grid grid-cols-3 gap-3 mt-5 pt-6">
                {/* Comment */}
                <div className="col-start-1 col-end-3">
                    <h1 className="my-5 text-orange-600 text-2xl border-b-2 border-orange-200 inline-block p-1">Comments ({post.comment_count})</h1>
                    <Suspense fallback={<NewCommentMainSkeleton/>}>
                        {
                            user &&
                                <div key={nanoid()}>
                                    <NewCommentMain
                                        postId={postId}
                                        userId={user.id || 0}
                                        parentId={0}
                                    />
                                </div>
                        }
                    </Suspense>
                    <Suspense fallback={<CommentListSkeleton/>}>
                        <CommentList
                            userId={user.id || 0}
                            postId={postId}
                            allMainComments={allMainComments}
                        />
                    </Suspense>
                </div>
                {/* Posts with other topics*/}
                <Suspense fallback={<TheBestViewPostSkeleton/>}>
                    <TheBestViewPost/>
                </Suspense>
            </div>
        </>
    )
}