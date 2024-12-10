
import Image from "next/image";
import { formatDate } from "@/utils/functions";
import intIcon from "@/public/tree.jpg";
import { Modal } from "./modal";
import { EditModalUser } from "./edit-user";
import { EmptyContent } from "@/components/Empty-content";

export async function TableUser ({
    users
} : {
    users: User[]
}) {
    if(users.length == 0) return <EmptyContent title="No users"/>;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 p-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* Head of table */}
                <thead className="text-xs uppercase text-orange-500 dark:bg-gray-700 dark:text-gray-400 border-2 border-orange-500">
                    <tr>
                        <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            avatar
                        </th>
                        <th scope="col" className="px-6 py-3">
                            fullname
                        </th>
                        <th scope="col" className="px-6 py-3">
                            username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            created date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                {/* Body of table */}
                <tbody>
                    {
                        users.length > 0 && users.map((user) => (
                            <tr className="text-orange-500 border-2 border-orange-500"
                                key={user.id}
                            >
                                <td className="w-4 p-2">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-3" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Image
                                        src={user.avatar || intIcon}
                                        alt=""
                                        width={200}
                                        height={100}
                                        priority
                                    />
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-orange-500 whitespace-nowrap dark:text-white">
                                    {user.fullname}
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-orange-500 whitespace-nowrap dark:text-white">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.phone}
                                </td>
                                <td className="px-6 py-4">
                                    {formatDate(user.created_at!)}
                                </td>
                                <td className="px-6 py-4">
                                    {user.role === 0  ? "user" : "admin"}
                                </td>
                                <td className="px-6 py-4">
                                  
                                    <Modal user={user}>
                                        <EditModalUser user={user}/>
                                    </Modal>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
