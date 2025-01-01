import Image from "next/image";
import conan from "@/public/conan.jpg"
import { Session } from "next-auth";
import Link from "next/link";


export function UserMenuAuthed ({
    session
}: {
    session?: Session|null
}) {
    return (
        <>
            <div tabIndex={0} role="button" className="btn m-1" title="user-avatar">
                <Image
                    className="w-8 h-8 rounded-full"
                    src={session?.user?.image || conan}
                    alt="user avatar"
                />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box">
                <li className="px-4 py-3">
                    <span className="block text-sm text-black dark:text-white">
                        {session?.user?.name}
                    </span>
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
            </ul>
        </>
    )
}