import Link from "next/link";
import { EmployeeType } from "@/helpers/definitions";
import { fetchAllEmployees } from "@/lib/data-employee";
import DeleteEmployee from "./delete-employee";
import moment from "moment";

const TableEmployee = async () => {
    const employees:EmployeeType[] = await fetchAllEmployees();
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
                            Fullname
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            createdAt
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Department
                        </th>
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                {/* Body of table */}
                <tbody>
                    {
                        employees.length > 0 && employees.map((employee) => (
                            <tr className="text-orange-500 border-2 border-orange-500"
                                key={employee.id}
                            >
                                <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-3" className="sr-only">checkbox</label>
                                </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-orange-500 whitespace-nowrap dark:text-white">
                                    {employee.first_name + employee.last_name}
                                </th>
                                <td className="px-6 py-4">
                                    {employee.email}
                                </td>
                                <td className="px-6 py-4">
                                    {employee.phone}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(employee.created_at).format('YYYY-MM-DD HH:mm')}
                                </td>
                                <td className="px-6 py-4">
                                    {employee.department_id}
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/employee/${employee.id}/edit`} 
                                        className="font-medium text-blue-600 dark:text-blue-500"
                                        title="Edit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <DeleteEmployee employeeId={employee.id}/>
                                </td>
                            </tr>
                        ))
                    }
                    {
                        employees.length == 0 && (
                            <tr 
                                className="text-orange-500 border-2 border-orange-500"
                            >
                                <td className="px-6 py-4 text-center" colSpan={7}> No employee!</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default TableEmployee;