import prisma from "@/prisma/client";

/**
 * Get all post categories
 * @returns 
 */
export async function getAllCategories() {
    try {
        return await prisma.post_Type.findMany();
    } catch (error) {
        console.log("Get all categories failed! " + error);
        return [];
    }
}
