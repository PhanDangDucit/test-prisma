import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/app/globals.css";
import { Provider } from "@/app/ui/MainContent";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getUserInfoSupabase } from "@/utils/auth.utils";
import { hosting } from "@/configs/constants";


const LayoutAdmin = async ({
    children
}: {
    children: React.ReactNode
}) => {
    /**
     * Check Jwt of user
     */
    fetch(`${hosting}/api/auth/check-jwt`);

    const user = await getUserInfoSupabase();
  
    if(user.email != "phanduc.flp@gmail.com") {
        redirect('/');
    }

    return (
        <html lang="en">
          <SpeedInsights/>
            <body className={inter.className}>
                <Provider>
                    {children}
                </Provider>
            </body>
      </html>
    );
}

export default LayoutAdmin;