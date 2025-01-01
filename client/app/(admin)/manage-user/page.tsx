
import { TableUser } from '@/components/admin/manage-user/table';
import { getAllUsers } from '@/lib/data-user';

const Page = async () => {
    const users: User[] = await getAllUsers();
    return (
        <div className="my-24 mx-24">
            <TableUser users={users}/>
        </div>
    );
}

export default Page;