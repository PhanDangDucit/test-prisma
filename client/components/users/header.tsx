'use client'
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { Session } from "next-auth";
import { UserMenu } from "./user-menu";

export default function Header({
    session,
}:{
    session?:Session|null,
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
                {/* <div className="items-center justify-between hidden w-full md:flex md:w-auto" id="navbar-user">
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
                </div> */}
                {/* User-menu */}
                <UserMenu session={session}/>
               
            </div>
        </nav>
     );
}