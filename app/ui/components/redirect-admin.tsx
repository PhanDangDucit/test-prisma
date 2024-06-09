import { isAdmin } from "@/utils/auth.utils"
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export default async function RedirectAdminComponent({
    user
}:{
    user:User
}) {
    if(!user || !isAdmin(user["email"])) {
        redirect('/');
    }
    
    return (
        <></>
    )
}