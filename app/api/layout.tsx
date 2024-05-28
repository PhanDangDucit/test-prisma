import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
const inter = Inter({ subsets: ["latin"] });
import RedirectComponent from "@/app/ui/components/redirect-user";
import RedirectAdminComponent from "@/app/ui/components/redirect-admin";

export const metadata: Metadata = {
  title: "suzu-blog",
  description: "blog is awesome",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <RedirectAdminComponent/>
          <RedirectComponent/>
          <Header className="fixed w-full top-0 h-[100px] z-20"/>
            {children}
          <Footer/>
      </body>
    </html>
  )
}
