import { eq} from "drizzle-orm";
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