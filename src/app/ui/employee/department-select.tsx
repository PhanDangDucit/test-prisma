// 'use client';
import { DepartmentType } from "@/helpers/definitions"

export default function DepartmentSelect(
    {
        departments, 
        department_id
    }: {
        departments:DepartmentType[],
        department_id?:number
    }
) {
    return (
        <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
            <select 
                id="department"
                name="department_id"
                defaultValue={department_id || 1}
                className="bg-gray-500 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {departments.map((department) => (
                    <option value={department.id} key={department.id}>{department.department_name}</option>
                ))}
            </select>
        </div>
    )
}