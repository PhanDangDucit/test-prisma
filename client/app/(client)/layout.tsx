import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "@/components/users/header";
import Footer from "@/components/users/footer";
import { getURL } from "@/helpers/http.helper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "suzu-blog",
  description: "blog is awesome",
};

/**
 * Get categories for header
 * @returns 
 */

async function getAllCategories () {
  return (await fetch(`${getURL()}/api/categories`, {
      cache: "no-cache"
  })).json()   
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [categoriesRes, session] = await Promise.all([
    await getAllCategories(),
    await auth()
  ]);

  let categories: CategoriesList = [];
  if(categoriesRes["status"] == "201") {
    categories = categoriesRes["data"]
  }
  console.log("data in categories:", categories);

  /**
   * Check admin
   */
  if(session?.user?.role == 1) {
    redirect('/dashboard');
  }

  return (
    <html lang="en">
      <SpeedInsights/>
      <body className={inter.className}>
        <Header session={session ? session : null} categories={categories}/>
          <main className="min-h-screen p-24 w-full">
            {children}
          </main>
        <Footer/>
      </body>
    </html>
  );
}