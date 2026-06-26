"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, incrementLike } from "@/app/services/blogs";
import { auth } from "@/auth";
import { ActionStatus } from "../components/NotificationContext";

export const createBlog = async (
  prevState: ActionStatus,
  formData: FormData,
) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  if (!(title?.length > 4) || !(author?.length > 4) || !(url?.length > 4)) {
    const failedBlogFormState: ActionStatus = { 
        error: "All fields must be at least 5 characters long.", 
        success: false, 
      };
    return failedBlogFormState;
  }

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  if (session.user)  revalidatePath(`/users/${session.user.email}`);

  return { 
    error: "", 
    success: true 
  };
};

export const addLike = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await incrementLike(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};