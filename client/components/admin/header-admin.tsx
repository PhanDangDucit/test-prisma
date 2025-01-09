'use client'
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { Session } from "next-auth";
import { NavUserAdmin } from "./nav-user-admin";

export default function  HeaderAdmin ({
    session,
} : {
    session: Session,
}) {
    return (
        <nav className="border-gray-200">
            <div className="bg-black flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="navbar-start bg-black">
                    <Link className="btn btn-ghost text-xl" href="/dashboard">
                        <Image
                            src={logo}
                            alt="logo"
                            width={100}
                            height={100}
                            priority
                            className="bg-black"
                        />
                    </Link>
                </div>
                {/* Nav */}
                <div className="items-center md:flex md:w-auto bg-black text-white" id="navbar-user">
                    <ul 
                        className="flex justify-between gap-2"
                    >
                        <li>
                            <Link href="/manage-user">User</Link>
                        </li>
                        <li>
                            <Link href="/manage-blog/posts">Blog</Link>
                        </li>
                        <li>
                            <Link href="/manage-blog/categories">Categories</Link>
                        </li>
                    </ul>
                </div>

                <NavUserAdmin imageUser={session?.user?.image ?? ""}/>
            </div>
        </nav>
     );
}