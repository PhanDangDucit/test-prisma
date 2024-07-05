
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/app/globals.css";
import { Provider } from "@/app/ui/MainContent";
import { SpeedInsights } from "@vercel/speed-insights/next"
// import { hosting } from "@/configs/constants";
import RedirectAdminComponent from "@/app/ui/components/redirect-admin";
import { getUserInfoSupabase } from "@/utils/auth.utils";

const LayoutAdmin = async ({
    children
}: {
    children: React.ReactNode
}) => {
    /**
     * Check Jwt of user
     */
    // fetch(`${hosting}/api/auth/check-jwt`);
    const user = await getUserInfoSupabase();

    return (
        <html lang="en">
            <SpeedInsights/>
            <body className={inter.className}>
                <RedirectAdminComponent user={user}/>
                <Provider>
                    {children}
                </Provider>
            </body>
      </html>
    );
}

export default LayoutAdmin;