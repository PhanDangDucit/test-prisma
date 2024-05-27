import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import { fetchAllPostCategories } from "@/lib/data-post";
import { redirect } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getUserInfoSupabase } from "@/utils/auth.utils";
import { hosting } from "@/configs/constants";
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
  fetch(`${hosting}/api/auth/check-jwt`);

  const user = await getUserInfoSupabase();
  console.log("user::", user);
  if(user) {
    if(user.email == "phanduc.flp@gmail.com") {
      redirect('/dashboard');
    }
  }
  const datas = await Promise.all([
    await fetchAllPostCategories(),
  ]);
  const categories = datas[0];
  if(!categories) return;
  return (
    <html lang="en">
      <SpeedInsights/>
      <body className={inter.className}>
        <Header categories={categories}/>
          <main className="min-h-screen p-24 w-full">
            {children}
          </main>
        <Footer/>
      </body>
    </html>
  );
}