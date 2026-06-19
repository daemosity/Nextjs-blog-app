"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, incrementLike } from "@/app/services/blogs";
import { auth } from "@/auth";

export const createBlog = async (formData: FormData) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const addLike = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await incrementLike(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};