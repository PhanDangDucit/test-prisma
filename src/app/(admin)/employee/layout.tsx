
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
        <div>
            {children}
        </div>
    );
}

export default Layout;