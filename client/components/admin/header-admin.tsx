'use client'
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { Session } from "next-auth";
import conan from "@/public/conan.jpg";

export default function  HeaderAdmin ({
    session,
} : {
    session: Session,
}) {
    return (
        <nav className="bg-black border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="navbar-start">
                    <Link className="btn btn-ghost text-xl" href="/dashboard">
                        <Image
                            src={logo}
                            alt="logo"
                            width={100}
                            height={100}
                            priority
                        />
                    </Link>
                </div>
                {/* Nav */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto" id="navbar-user">
                    <ul 
                        className="flex text-white flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                    >
                        <li>
                            <Link href="/manage-user">User</Link>
                        </li>
                        <li>
                            <Link href="/manage-blog/posts">Blog</Link>
                        </li>
                        <li>
                            <Link href="/manage-blog/categories">Category posts</Link>
                        </li>
                    </ul>
                </div>

                {/* User action */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1" title="user-avatar">
                        <Image
                            className="w-8 h-8 rounded-full"
                            src={session?.user?.image || conan}
                            alt="user photo"
                        />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-60">
                        {
                            session && (
                            <>
                                <li className="p-0">
                                    <ul className="p-2" aria-labelledby="user-menu-button">
                                        <li className="border-[1px] border-gray-300 text-center text-black rounded-xl">
                                            <Link href="/your-profile">Profile</Link>
                                        </li>
                                        <li className="border-[1px] border-gray-300 text-center text-black rounded-xl mt-2">
                                            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
     );
}