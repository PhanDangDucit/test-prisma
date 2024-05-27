import EditorBox from "@/app/ui/post/create-editor-box";
import { auth } from "@/auth";
import { PostCategoriesType, User } from "@/helpers/definitions";
import { getUserByEmail } from "@/lib/actions-user";
import { fetchAllPostCategories } from "@/lib/data-post";
import { getUserInfoSupabase } from "@/utils/auth.utils";

const Page = async () => {
    const postCategories = await fetchAllPostCategories();
    const email = (await getUserInfoSupabase()).email;
    const user = await getUserByEmail(email!) as User;
    console.log("user::", user);

    return (
        <div className="min-h-screen p-24 w-full">
            <EditorBox categories={postCategories} userId={user.id}/>
        </div>
    )
}

export default Page;