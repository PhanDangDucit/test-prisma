
import { Suspense } from "react";
import { getAuthorOfPost } from "@/lib/data-user";
import ContentMainDetailPost from "@/components/users/post/detail/content";
import { fetchPostBySlug, fetchPostCategoryById } from "@/lib/posts/posts.lib";
import { ContentMainDetailPostSkeleton } from "@/components/users/post/skeletons-post";
import { PostContextProvider } from "@/stores/post-context";

export default async function Page({ 
    params
} : { 
    params: { slug: string }
}) {
    const slug = decodeURIComponent(params.slug);
    const post = await fetchPostBySlug(slug)
    if(!post) return;
    const [
        category, 
        author,
    ] = await Promise.all([
        await fetchPostCategoryById(post.post_type_id),
        await getAuthorOfPost(post.author_id) as User,
    ]);
    
    return (
        <>
            {/* Main */}
            <PostContextProvider slug={slug}>
                <div className="mx-auto">
                    <Suspense fallback={<ContentMainDetailPostSkeleton/>}>
                        <ContentMainDetailPost
                            author={author}
                            category={category} 
                            post={post}
                        />
                    </Suspense>
                </div>
            </PostContextProvider>
        </>
    )
}