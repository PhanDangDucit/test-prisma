import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/app/globals.css";
import HeaderAdmin from "@/components/admin/header-admin";

const LayoutAdmin = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const session = await auth();
    if(session?.user?.role != 1) {
        redirect('/');
    }
    
    return (
        <html lang="en">
            <body className={inter.className}>
                <HeaderAdmin session={session}/>
                <div className="container mx-auto">
                    {children}
                </div>
            </body>
      </html>
    );
}

export default LayoutAdmin;