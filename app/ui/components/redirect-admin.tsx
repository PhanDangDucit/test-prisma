import { getUserInfoSupabase } from "@/utils/auth.utils"
import { redirect } from "next/navigation";

export default async function RedirectAdminComponent() {
    const user = await getUserInfoSupabase();
    if(!user) return;

    if(user.email != "phanduc.flp@gmail.com") {
        redirect('/');
    }
    
    return (
        <></>
    )
}