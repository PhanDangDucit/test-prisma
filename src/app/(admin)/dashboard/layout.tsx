import Sidebar from "@/app/ui/employee/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const session = await auth();
    if(session?.user?.role == 0) {
        redirect('/');
    }
    return (
        <div className="flex">
            <div className="w-1/5 py-10">
                <Sidebar/>
            </div>
            <div className="w-4/5">
                {children}
            </div>
        </div>
    );
}

export default Layout;