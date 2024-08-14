import TableEmployee from "@/app/ui/employee/table";
import SearchEmployee from "@/app/ui/employee/search";
import Pagination from "@/app/ui/employee/pagination";

const Page = async() => {
    return (
        <div className="mt-5">
            <SearchEmployee/>
            <TableEmployee/>
            <Pagination/>
        </div>
    );
}
 
export default Page;