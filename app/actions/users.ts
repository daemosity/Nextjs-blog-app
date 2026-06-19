"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getUserByUsername } from '../services/users';

export type RegistrationFormData = {
  error: string;
  values: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
  }
}

export const registerUser = async (
  prevState: RegistrationFormData,
  formData: FormData, 
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  if (!(username?.length > 3) || !(password?.length > 3)) {
    return {
      error: "All fields must be at least 4 characters long",
      values: { username, name, password, passwordConfirm }
    };
  }

  const userExists = await getUserByUsername(username);
  if (userExists) {
    return {
      error: "Username already exists",
      values: { username, name, password, passwordConfirm }
    };
  }

  if (password !== passwordConfirm) {
    return {
      error: "Passwords do not match",
      values: { username, name, password, passwordConfirm: '' }
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({ username, name, passwordHash });
  } catch (error) {
    console.log("Unexpected error:", error);
    return {
      error: "An unexpected error occurred",
      values: { username, name, password, passwordConfirm }
    };
  }

  revalidatePath("/users");
  redirect("/login");
}