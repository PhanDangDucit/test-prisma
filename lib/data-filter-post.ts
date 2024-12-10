import prisma from "@/prisma/client";
import { SearchQuery } from "@/types";

/**
 * Get post when admin only filter query
 * @param q
 * @returns 
 */

export async function getPostsByFilter(search:SearchQuery) {
    const q = search.q;
    const fromDate = search['from-date'];
    const toDate = search['to-date'];
    const minViews = search['min-view'];
    const maxViews = search['max-view'];
    const category = search['category'];
    const status = search['status'];
    if(status === "hidden") {
        var statusFormat = "Hidden";
    } else {
        var statusFormat = "Show";
    }

    try {
        const posts = await prisma.post.findMany({
            where: {
                post_type: {
                    name_post_type: {
                        contains: category,
                        mode: 'insensitive'
                    }
                },
                OR: [
                    {
                        post_type: {
                            name_post_type: {
                                contains: q,
                                mode: 'insensitive'
                            }
                        },
                    },
                    {
                        content: {
                            contains: q,
                            mode: 'insensitive'
                        },
                    },
                    {
                        slug: {
                            contains: q,
                            mode: 'insensitive'
                        },
                    }
                ],
                views: {
                    lte:Number(maxViews),
                    gte:Number(minViews)
                },
                created_at: {
                    lte:toDate,
                    gte:fromDate
                },
                is_show: statusFormat === "Hidden" ? "Hidden" : "Show",
            },
            orderBy: {
                id: 'desc'
            }
        });
        await prisma.$disconnect();
        return posts;
    } catch (error) {
        await prisma.$disconnect();
        console.log("Get post when filter is failed! " + error);
        return [];
    }
}
