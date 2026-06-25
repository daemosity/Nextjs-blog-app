import { eq} from "drizzle-orm";
import { db } from "@/db";
import { SelectUser, users } from '@/db/schema';
import { BlogPublicInfo } from "./blogs";

export type UserPublicInfo = Omit<SelectUser, "passwordHash" | "token">;
export type UserAndBlogPublicInfo = UserPublicInfo & { blogs?: BlogPublicInfo[] }

export const getUsers = async (): Promise<UserPublicInfo[] | undefined> => {
  return db.query.users.findMany({
    columns: {
        id: true,
        name: true,
        username: true
    }
  });
};

export const getUserByUsername = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username),
        with: { blogs: false || {
            columns: {
                id: true,
                title: true,
            }
        }},
    });
}

export const updateToken = async (username: string, token: string) => {
    return db.update(users).set({token: token}).where(eq(users.username, username));
}

export const getUserByAPIToken = async (token: string): Promise<UserAndBlogPublicInfo | undefined> => {
    return db.query.users.findFirst({
        where: eq(users.token, token),
        columns: {
            id: true,
            username: true,
            name: true, 
        },
        with: {
            blogs: { 
                columns: {
                    author: true,
                    title: true,
                    url: true,
                    likes: true,
                }
            }
        },
    });
}