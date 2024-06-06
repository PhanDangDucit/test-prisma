
import { TableUser } from '@/app/ui/admin/manage-user/table';
import { TUser } from '@/helpers/definitions';
import { getManyUsers } from '@/lib/data-user';

const Page = async () => {
    const users = await getManyUsers<TUser>(100);
    if(!users) return;
    
    return (
        <div className="my-24 mx-24">
            <TableUser users={users}/>
        </div>
    );
}

export default Page;