import prisma from "@/prisma/client";

/**
 * Get all post categories
 * @returns 
 */
export async function getAllCategories() {
    try {
        return await prisma.post_types.findMany();
    } catch (error) {
        throw new Error("Get all categories failed! " + error);
    }
}
