import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import { fetchAllPostCategories } from "@/lib/data-post";
import { SpeedInsights } from "@vercel/speed-insights/next"
// import { hosting } from "@/configs/constants";
import RedirectUserComponent from "@/app/ui/components/redirect-user";
import { getUserInfoSupabase } from "@/utils/auth.utils";
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
    const user = await getUserInfoSupabase();
    
    const datas = await Promise.all([
        await fetchAllPostCategories(),
    ]);
    
    const categories = datas[0];
    if(!categories) return;

    return (
      <html lang="en">
          <SpeedInsights/>
          <body className={inter.className}>
              <RedirectUserComponent email={user["email"]!}/>
              <Header categories={categories}/>
                  <main className="min-h-screen p-24 w-full">
                      {children}
                  </main>
              <Footer/>
          </body>
      </html>
    );
}