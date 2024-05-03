// import { unstable_noStore as noCache } from 'next/cache';
// import moment from 'moment';
import prisma from "@/prisma/client";

/**
 * Save info of user from provider
 * @param email 
 * @param role 
 */
export async function createNewAccountByProvider(email:string, role:number, name: string) {
    try {
        await prisma.user.create({
            data: {
                email,
                role,
                username: name
            },
        })
        await prisma.$disconnect();
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("create account is failed: " + error);
    }
}

/**
 * FInd user by email
 * @param email 
 * @returns 
 */
export async function findUserByEmail(email: string) {
    try {
        const user = prisma.user.findFirst({
            where: {
                email
            },
        })
        await prisma.$disconnect();
        return user;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Get all post failed! " + error);
    } 
}

/** 
 * Get role user by email
 * @param email 
 * @returns 
 */
export async function fetchRoleUserByEmail(email: string){
    try {
        const user = await findUserByEmail(email);
        await prisma.$disconnect();
        return user?.role;
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Find user error::" + error);
    }
}

/**
 * Check if the user exists
 * @param email
 * @returns 
 */
export async function isCheckExistsUser(email:string) {
    try {
        const user = await findUserByEmail(email);
        await prisma.$disconnect();
        if(user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        await prisma.$disconnect();
        throw new Error("Check exists user is failed:: " + error);
    }
}


/**
 * process account from provider
 * @param email
 * @param userRole
 * @returns
 */
export async function processAccountProvider(email: string|null, userRole:number, name: string) {
   try {
        if(email) {
            const isExistsUser = await isCheckExistsUser(email);
            if(!isExistsUser) {
                createNewAccountByProvider(email, userRole, name);
            } else {
                return await fetchRoleUserByEmail(email);
            }
        }
        await prisma.$disconnect();
    } catch (err) {
        await prisma.$disconnect();
        throw new Error("Process account provider is failed!");
    }
}

// export async function getAuthorId(userId: number) {
//     try {
//         const authorId = await prisma.user
//     } catch (error) {
//         throw new Error("Get author id by slug: " + error);
//     }
// }

// export async function insertDataInPostUser(userId: number, postId: number) {
//     try {
//         await prisma.post_User.create({
//             data: {
//                 user_id: userId,
//                 post_id: postId
//             }
//         })
//     } catch (error) {
//         throw new Error("Insert data in insert data is failed: " + error);
//     }
// }

/**
 * Get all users
 * @returns 
 */
export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        throw new Error("Get all users is failed: " + error);
    }
}

export async function getAuthorOfPost(userId: number) {
    try {
        const users = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                username: true
            }
        });
        return users;
    } catch (error) {
        throw new Error("Get all users is failed: " + error);
    }
}

