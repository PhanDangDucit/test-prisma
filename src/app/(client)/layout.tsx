import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import RedirectUserComponent from "@/app/ui/components/redirect-user";
import { getUserInfoSupabase } from "@/utils/auth.utils";
import { getAllCategories } from "@/lib/data-post-types";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "suzu-blog",
  description: "blog is awesome",
};

export default async function RootLayout({
    children,
} : {
    children: React.ReactNode;
}) {
    
    const datas = await Promise.all([
        await getUserInfoSupabase(),
        await getAllCategories()
    ]);
    
    const user = datas[0];
    const categories = datas[1];
    
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