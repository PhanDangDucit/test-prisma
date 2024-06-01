import { isAdmin } from "@/utils/auth.utils"
import { redirect } from "next/navigation";

export default async function RedirectAdminComponent({
    email
}:{
    email:string
}) {
    if(!email) return;

    if(!isAdmin(email)) {
        redirect('/');
    }
    
    return (
        <></>
    )
}