'use client'
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { Session } from "next-auth";
import conan from "@/public/conan.jpg"

export default function Header({
    session,
    categories
}:{
    session?:Session|null,
    categories:CategoriesList
}) {
    return ( 
        <nav className="bg-black border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <div className="navbar-start">
                    <Link className="btn btn-ghost text-xl" href="/">
                        <Image
                            src={logo}
                            alt="logo"
                            width={100}
                            height={100}
                            priority
                        />
                    </Link>
                </div>
                {/* Nav-main */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto" id="navbar-user">
                    <ul 
                        className="flex text-white flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                    >
                        {
                            categories && categories.map((category) => (
                                <li className="uppercase text-base" key={category.id}>
                                    <Link href={`/blog/categories/${category.name_post_type}`}>{category.name_post_type}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* User-menu */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1" title="user-avatar">
                        <Image
                            className="w-8 h-8 rounded-full"
                            src={session?.user?.image || conan}
                            alt="user photo"
                        />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box">
                        {session ? (
                            <>
                                <li className="px-4 py-3">
                                    <span className="block text-sm text-black dark:text-white">{session?.user?.name}</span>
                                    <span className="block text-sm  text-black truncate dark:text-gray-400">{session?.user?.email}</span>
                                </li>
                                <li className="p-0">
                                    <ul className="p-2" aria-labelledby="user-menu-button">
                                        <li className="border-[1px] border-gray-300 text-center text-black rounded-xl">
                                            <Link href="/user/profile">Profile</Link>
                                        </li>
                                        <li className="border-[1px] border-gray-300 text-center text-black rounded-xl mt-2">
                                            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) :   (    
                        <>
                            <li>
                                <ul className="p-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <Link href="/api/auth/signin" className="text-black">Signin</Link>
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