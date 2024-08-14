import { FormEditEmployee } from "@/app/ui/employee/edit-form";

const Page = ({
    params
}:{params: {id:string}}) => {
    return (
        <>
            <FormEditEmployee id={params.id}/>
        </>
    );
}
 
export default Page;