import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import { fetchAllPostCategories } from "@/lib/data-post";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next"
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
  const datas = await Promise.all([
    await fetchAllPostCategories(),
    await auth()
  ]);
  const categories = datas[0];
  const session = datas[1];
  if(!categories) return;
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