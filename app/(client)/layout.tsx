import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
// import { hosting } from "@/configs/constants";
import RedirectUserComponent from "@/app/ui/components/redirect-user";
import { getUserInfoSupabase } from "@/utils/auth.utils";
import { getAllCategories } from "@/lib/data-categories-post";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "suzu-blog",
  description: "blog is awesome",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    /**
     * Check JWt of user
     */
    // fetch(`${hosting}/api/auth/check-jwt`);
    
    const datas = await Promise.all([
        await getUserInfoSupabase(),
        await getAllCategories()
    ]);
    
    const user = datas[0];
    const categories = datas[1];
    
    // console.log("categories::", categories);
    if(!categories) return;

    return (
        <html lang="en">
            <SpeedInsights/>
            <body className={inter.className}>
                {
                    user && <RedirectUserComponent email={user["email"]}/>
                }
                <Header
                    categories={categories}
                />
                <main className="min-h-screen p-24 w-full">
                    {children}
                </main>
                <Footer/>
            </body>
        </html>
    );
}