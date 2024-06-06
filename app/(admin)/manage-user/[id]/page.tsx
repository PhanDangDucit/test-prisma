import { EditModalUser } from "@/app/ui/admin/manage-user/edit-user";
import { TUser } from "@/helpers/definitions";
import { getUserById } from "@/lib/actions-user";

export default async function Page({
    params: { id }
} : {
    params: { id: number }
}) {
    const user = await getUserById(id) as TUser;
    // return <EditModalUser user={user}/>
    return <EditModalUser user={user}/>
}