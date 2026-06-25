import { and, eq} from "drizzle-orm";
import { db } from "@/db";
import { readingList } from "@/db/schema";

export const getUserReadingList = async (userId: number) => {
    return await db.query.readingList.findMany({
        where: eq( readingList.userId, userId),
        columns: {
            id: true,
            read: true,
        },
        with: {
            blog: {
                columns: {
                    id: true,
                    title: true,
                }
            }
        }
    });
}

export const insertToReadingList = async (userId: number, blogId: number) => {
    return await db.insert(readingList).values({blogId, userId});
}

export const setReadingListBlogAsRead = async (userId: number, blogId: number) => {
    return await db.update(readingList).set({ read: true}).where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)));
}