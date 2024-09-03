import { PostItem } from "@/components/users/home/post-item";
import { nanoid } from "nanoid";

export function PostList ({posts}: {posts: PostsList}) {
    
    return (
        <div>
            {posts && posts.map((post) => (
                <div key={nanoid()}>
                    <PostItem post={post}/>
                </div>
            ))}
        </div>
    )
}