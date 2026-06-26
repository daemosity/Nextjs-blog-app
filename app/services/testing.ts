import { txDb } from "@/db";
import { blogsTable, readingList, users } from "@/db/schema";

export const truncateAllTables = async () => {
    return await txDb.transaction(async (tx) => {
        await tx.delete(readingList);
        await tx.delete(blogsTable);
        await tx.delete(users);
    });
}