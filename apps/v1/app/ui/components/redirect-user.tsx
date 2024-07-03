import { redirect } from "next/navigation";
import { isAdmin } from "@/utils/auth.utils"

export default async function RedirectUserComponent ({
    email
}:{
    email?: string
}) {
    
    if(!email) return;

    /**
     * Check admin
     */
    if(isAdmin(email)) {
        redirect('/dashboard');
    }

    return (
        <></>
    )
}