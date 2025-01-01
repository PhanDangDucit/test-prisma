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
        console.log("create account is failed: " + error);
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

/**
 * Get all users
 * @returns 
 */
export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.log("Get all users is failed: " + error);
        return [];
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

