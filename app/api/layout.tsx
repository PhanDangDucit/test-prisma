import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
import { getUserInfoSupabase } from "@/utils/auth.utils";
import { hosting } from "@/configs/constants";

export const metadata: Metadata = {
  title: "suzu-blog",
  description: "blog is awesome",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  fetch(`${hosting}/api/auth/check-jwt`);
  
  const user = await getUserInfoSupabase();

  if(user) {
    if(user.email == "phanduc.flp@gmail.com") {
      redirect('/dashboard');
    } else {
      redirect('/');
    }
  }

  return (
    <html lang="en">
        <body className={inter.className}>
            <Header className="fixed w-full top-0 h-[100px] z-20"/>
              {children}
            <Footer/>
        </body>
    </html>
  )
}
