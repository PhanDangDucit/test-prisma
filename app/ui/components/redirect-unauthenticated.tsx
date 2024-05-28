import { getUserInfoSupabase } from "@/utils/auth.utils"
import { redirect } from "next/navigation";

/**
 * Component is only used for "normal" user's "private" components
 * @returns
 */
export default async function RedirectAdminComponent() {
    const user = await getUserInfoSupabase();
    if(!user) {
        redirect('/');
    };

    return (
        <></>
    )
}