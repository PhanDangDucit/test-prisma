import prisma from "@/prisma/client";
import { PostCategoriesType } from "@/types";

/**
 * Get all post categories
 * @returns 
 */
export async function getAllCategories(): Promise<Array<PostCategoriesType>> {
    try {
        return await prisma.post_Type.findMany();
    } catch (error) {
        console.log("Get all categories failed! " + error);
        return [];
    }
}
