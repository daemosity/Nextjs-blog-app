"use server"

import { revalidatePath } from "next/cache";
import { insertToReadingList } from "../services/readingList";

export const addToReadingList = async (formData: FormData) => {
    const blogId = parseInt((formData.get("blogId") as string)?.trim(), 10);
    const userId = parseInt((formData.get("userId") as string)?.trim(), 10);

    if (!blogId || !userId) {
        return
    }

    try {
        await insertToReadingList(userId, blogId);
        revalidatePath("/me");
        revalidatePath(`/blog/${blogId}`);
    } catch (error) {
        console.error(error);
    }
}

export const markRead = async(formData:FormData) => {
    console.log("mark read called");
    console.log(formData);
}