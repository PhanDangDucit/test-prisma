import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
const inter = Inter({ subsets: ["latin"] });
import RedirectUserComponent from "@/app/ui/components/redirect-user";
import RedirectAdminComponent from "@/app/ui/components/redirect-admin";
import { getUserInfoSupabase } from "@/utils/auth.utils";

export const metadata: Metadata = {
  title: "suzu-blog",
  description: "blog is awesome",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfoSupabase();
  return (
    <html lang="en">
      <body className={inter.className}>
          <RedirectAdminComponent email={user["email"]!}/>
          <RedirectUserComponent email={user["email"]!}/>
          <Header className="fixed w-full top-0 h-[100px] z-20"/>
            {children}
          <Footer/>
      </body>
    </html>
  )
}
