import { getURL } from "@/helpers/http.helper";
import { PostList } from "@/components/users/home/post-list";

async function getALlPosts (limit: number, offset: number) {
    return (await fetch(`${getURL()}/api/posts?limit=${limit}&offset=${offset}`, {
        cache: "no-cache"
    })).json()
}

export default async function ContentHomeUser() {
    const LIMIT = 5;
    const OFFSET = 0;
    const data = await getALlPosts(LIMIT, OFFSET);

    let posts: PostsList = [];
    
    if(data["status"] == "201") {
        posts = data["data"];
    }

    return (
       <PostList postsInit={posts}/>
    )
}