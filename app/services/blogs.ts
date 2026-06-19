import { eq, ilike} from "drizzle-orm";
import { db } from "@/db";
import { blogsTable, SelectBlog } from '@/db/schema';
import { getCurrentUser } from "./session";

export const getBlogs = async (filter: string = ''): Promise<SelectBlog[]> => {
    return await db.select().from(blogsTable).where(ilike(blogsTable.title, `%${filter}%`));
}

export const addBlog = async (title: string, author: string, url: string) => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Not logged in");
    }
    return await db.insert(blogsTable).values({ title, author, url, userId: user.id }).returning();
}

export const getBlogById = async (id: number) => {
    return db.query.blogsTable.findFirst({
        where: eq(blogsTable.id, id)
    });
}

export const incrementLike = async (id: number) => {
    const blog = await getBlogById(id);
    if (blog) {
        await db
        .update(blogsTable)
        .set({ likes: blog.likes + 1 })
        .where(eq(blogsTable.id, id));
    }
}