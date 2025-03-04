import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { processAccountProvider } from "../lib/data-user";

export const options = {
    providers: [
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
            profile(profile) {
                let userRole = 0;
                if(profile?.email == "phanduc.flp@gmail.com") {
                    userRole = 1;
                }
                // console.log("profile:::", profile);
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole
                }
            },
        })
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
            // console.log("token:: ", token);
            return token;
        },
        async session({session, token}: {session:Session, token: JWT}) {
            if(session?.user) {
                session.user.role = token.role;
                delete session.user.name;
                session.user.name = token.name;
            }
            // console.log("session:: ", session);
            return session;
        },
    }
}