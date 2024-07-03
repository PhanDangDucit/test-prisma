import NextAuth from "next-auth";
import {options} from "./configs/auth.config";
// import { NextAuthConfig } from "next-auth";

declare module "next-auth" {
    interface User {
        id?: string
        name?: string | null
        email?: string | null
        image?: string | null
        role: number
    }
}
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        role: number
    }
}
export const { handlers, auth } = NextAuth(options)
