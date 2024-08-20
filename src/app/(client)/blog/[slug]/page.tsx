import ContentMainDetailPost from "@/app/ui/post/detail/content";
import {
    TheBestViewPost,
    ManyViewsPosts
} from "@/app/ui/post/detail/posts";

import { 
    ContentMainDetailPostSkeleton, 
    ManyViewsPostsSkeleton, 
    TheBestViewPostSkeleton 
} from "@/app/ui/post/skeletons-post";
import { PostCategoriesType, PostType, TUser } from "@/helpers/definitions";
import { getUserByEmail } from "@/lib/actions-user";
import { getAllMainComments } from "@/lib/data-comment";

import { 
    getManyPost,
    fetchOnePost
} from "@/lib/data-post";
import { Suspense } from "react";
import CommentPart from "@/app/ui/post/detail/comment";
import { userCont } from "@/configs/constants";
import { PostContextProvider } from "@/app/store/post-context";
import { getAuthorOfPost } from "@/lib/data-user";
import { getUserInfoSupabase } from "@/utils/auth.utils";
import { getOneCategory } from "@/lib/data-post-types";

export default async function Page({ 
    params
} : { 
    params: { slug: string }
}) {
    const slug = decodeURIComponent(params.slug);
    console.log('*', slug, '*');
    const posts = await fetchOnePost<PostType>("slug", slug);
    if(!posts) return;
    const post = posts[0];
    
    // console.log("posts?", posts);
    // console.log("post?", post);
    // console.log("what?", post["author_id"]);

    const [
        category, 
        user,
        relatedPosts, 
        author,
        similarPosts,
    ] = await Promise.all([
        await getOneCategory<PostCategoriesType>('id', post.post_type_id),
        await getUserInfoSupabase(),
        await getManyPost<PostType>(post.post_type_id, 2, 'created_at'),
        await getAuthorOfPost<TUser>(post["author_id"]),
        await getManyPost<PostType>(post.post_type_id, 4, 'view'),
    ]);
    // console.log("author:::", author);
    
    const email = user?.email;
    let userInfo:TUser = userCont;

    // check user logging to comment
    if(email) {
        userInfo = await getUserByEmail(email) as TUser;
    }

    // console.log("category:::", category);
    // console.log("user:::", user);
    // console.log("related:::", relatedPosts);
    // console.log("author:::", author);
    // console.log("similar:::", similarPosts);

    return (
        <>
            {/* Main */}
            {/* <PostContextProvider slug={slug}> */}
                <div className="grid grid-cols-3 gap-3">
                    <Suspense fallback={<ContentMainDetailPostSkeleton/>}>
                        <ContentMainDetailPost 
                            author={author![0]} 
                            relatedPosts={relatedPosts!}
                            category={category![0]['name_post_type']} 
                            post={post}
                        />
                    </Suspense>
                    <Suspense fallback={<ManyViewsPostsSkeleton/>}>
                        <ManyViewsPosts similarPosts={similarPosts!}/>
                    </Suspense>
                </div>
                <hr className="w-full h-1 mx-auto my-12 bg-gray-300 border-0 rounded md:my-8 dark:bg-gray-300"/>
                
                <div className="grid grid-cols-3 gap-3 mt-5 pt-6">
                    {/* Comment */}
                    <div className="col-start-1 col-end-3">
                        {/* <CommentPart
                            userInfo={userInfo}
                        /> */}
                    </div>
                    {/* Posts with other topics*/}
                    <Suspense fallback={<TheBestViewPostSkeleton/>}>
                        {/* <TheBestViewPost manyViewsPosts={manyViewsPosts}/> */}
                    </Suspense>
                </div>
            {/* </PostContextProvider> */}
        </>
    )
}