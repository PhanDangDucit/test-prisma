
import { fetchAllDepartments } from "@/lib/data-employee";
import { DepartmentType } from "@/helpers/definitions";
import FormCreateEmployee from "@/app/ui/employee/create-form";

const Page = async() => {
    const departments:DepartmentType[] = await fetchAllDepartments();
    return (
        <div 
            className="mx-auto p-4 border-2 border-violet-300 w-1/2 rounded-2xl shadow-blue-500/50 mt-5"
        >
           <FormCreateEmployee 
                departments={departments}
            />
        </div>
    );
}

export default Page;