import EditorBox from "@/app/ui/post/create-editor-box";
import { auth } from "@/auth";
import { PostCategoriesType, User } from "@/helpers/definitions";
import { getUserByEmail } from "@/lib/actions-user";
import { fetchAllPostCategories } from "@/lib/posts/data-post";

const Page = async () => {
    const data = await Promise.all([
        await fetchAllPostCategories(),
        await auth()
    ]);
    const postCategories:PostCategoriesType[] = data[0];
    const session = data[1];
    
    if(!session) return
    if(!session.user) return
    const email = session.user.email;
    const user = await getUserByEmail(email!) as User;
    return (
        <div className="min-h-screen p-24 w-full">
            <EditorBox categories={postCategories} userId={user.id}/>
        </div>
    )
}

export default Page;