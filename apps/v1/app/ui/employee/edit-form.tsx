import { updateEmployee } from "@/lib/actions-employee";
import { fetchAllDepartments, fetchEmployeeById } from "@/lib/data-employee";
import DepartmentSelect from "./department-select";

export async function FormEditEmployee({id}: {id: string}) {
    const [departments, employee] = await Promise.all([fetchAllDepartments(), fetchEmployeeById(id)])
    // const departments = await fetchAllDepartments();
    // const employee = (await fetchEmployeeById(id));
    const updateEmployeeWithId = updateEmployee.bind(null, id);

    return (
       <>
            <h1 className="text-center text-xl">Add a employee</h1>
            <form className="max-w-md mx-auto text-white mt-5" 
                action={updateEmployeeWithId}
            >
                {/* First name */}
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text" 
                        name="first_name" 
                        id="first_name" 
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        required
                        defaultValue={employee?.first_name}
                    />
                    <label 
                        htmlFor="first_name" 
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        First Name
                    </label>
                </div>
                {/* Last name */}
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text" 
                        name="last_name" 
                        id="lastname" 
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        required
                        defaultValue={employee?.last_name}
                    />
                    <label htmlFor="lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Last Name
                    </label>
                </div>
                {/* Email */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text" name="email" id="email" 
                        defaultValue={employee?.email}
                        className="text-white block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Email
                    </label>
                </div>
                {/* Image */}
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text" name="image_url" id="image"
                        defaultValue={employee?.image_url}
                        className="text-white block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                    />
                    <label htmlFor="image" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Image
                    </label>
                </div>
                {/* Department */}
                <DepartmentSelect departments={departments} department_id={employee.department_id || 1}/>
                {/* Phone */}
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                        type="text" name="phone" id="phone"
                        defaultValue={employee.phone}
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Phone
                    </label>
                </div>
                {/* Button to create */}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create
                </button>
            </form>
       </>
    )
}