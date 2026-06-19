"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, incrementLike } from "@/app/services/blogs";
import { auth } from "@/auth";

export type BlogFormState = {
  error: string;
  values?: {
    title?: string;
    author?: string;
    url?: string;
  };
};

export const createBlog = async (
  prevState: BlogFormState,
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
    const failedBlogFormState: BlogFormState = { 
        error: "All fields must be at least 5 characters long.", 
        values: { title, author, url } 
      };
    return failedBlogFormState;
  }

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  if (session.user)  revalidatePath(`/users/${session.user.email}`);

  const resetBlogFormState: BlogFormState = { 
    error: "", 
    values: { title: "", author: "", url: "" } 
  };
  redirect("/blogs")
};

export const addLike = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await incrementLike(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};