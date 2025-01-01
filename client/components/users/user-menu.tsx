import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserMenuAuthed } from "./user-menu-authed";

export function UserMenu({
    session
}: {
    session?:Session|null
}) {
    return (
        <div className="dropdown dropdown-end">
                {
                    session ? <UserMenuAuthed session={session}/>
                        : (
                            <Button className="bg-white hover:bg-gray-400">
                                {
                                    <Link href="/api/auth/signin" className="text-black">Sign In</Link>
                                }
                            </Button>
                        )
                }
            </div>
    )
}