// import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { processAccountProvider } from "../lib/data-user";

export const options = {
    providers: [
        // GitHubProvider({
        //     async profile(profile) {
        //         let userRole = 0;
        //         if(profile?.email == "phanduc.flp@gmail.com") {
        //             userRole = 1;
        //         }
        //         return {
        //             ...profile,
        //             id:String(profile.id),
        //             role: userRole
        //         }
        //     }, 
        // }),
        FacebookProvider({
            async profile(profile) {
                let userRole = 0;
                if(profile?.email == "phanduc.flp@gmail.com") {
                    userRole = 1;
                }
                return {
                    ...profile,
                    id:String(profile.id),
                    role: userRole
                }
            }, 
        }),
        GoogleProvider({
            // refresh token
            // authorization: {
            //     params: {
            //       prompt: "consent",
            //       access_type: "offline",
            //       response_type: "code",
            //     },
            // },
            profile(profile) {
                let userRole = 0;
                if(profile?.email == "phanduc.flp@gmail.com") {
                    userRole = 1;
                }
                console.log("profile:::", profile);
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole
                }
            },
        }),
        // CredentialsProvider({
        //     // Name of you
        //     name: "account",
        //     credentials: {
        //         email: {
        //             label: "Email:",
        //             type: "text",
        //             placeholder: "eamil..."
        //         },
        //         password: {
        //             label: "Password:",
        //             type: "password",
        //             placeholder: "password..."
        //         }
        //     },
        //     async authorize(credentials) {
        //         try {
        //             // find user in database
        //             console.log(credentials);
        //         } catch (error) {
        //             console.log("You cannot login!::: ", error);
        //         }
        //         return null;
        //     }
        // }),
    ],
    callbacks: {
        async jwt({token, user} : {token: JWT, user:User}) {
            if(user) {
                const email = user.email!;
                const role = user.role!;
                const name = user.name!;
                processAccountProvider(email, role, name);
                token.role = user.role;
                token.username = user.name;
            };
            console.log("token:: ", token);
            return token;
        },
        async session({session, token}: {session:Session, token: JWT}) {
            if(session?.user) {
                session.user.role = token.role;
                delete session.user.name;
                session.user.name = token.name;
            }
            console.log("session:: ", session);
            return session;
        },
    }
}