import { redirect } from "next/navigation";
import { getUserInfoSupabase } from "@/utils/auth.utils"

export default async function RedirectUserComponent () {
    const user = await getUserInfoSupabase();
    if(!user) return;
    if(user.email == "phanduc.flp@gmail.com") {
        redirect('/dashboard');
    }

    return (
        <></>
    )
}