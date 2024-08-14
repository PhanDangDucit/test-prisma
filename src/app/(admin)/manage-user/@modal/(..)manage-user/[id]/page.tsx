import { EditModalUser } from "@/app/ui/admin/manage-user/edit-user"
import { Modal } from "@/app/ui/admin/manage-user/modal";
import { User } from "@/helpers/definitions";
import { getUserById } from "@/lib/actions-user";

export default async function EditUser({
    params: { id }
} : {
    params: { id: number }
}) {
    const user = await getUserById(id) as User;
    return (
        <Modal user={user}>
            <EditModalUser user={user}/>
        </Modal>
    )
}