"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getUserByUsername, updateToken } from '../services/users';

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

  const formVals = { username, name, password, passwordConfirm };
  if (!(username?.length > 3) || !(password?.length > 3)) {
    return {
      error: "All fields must be at least 4 characters long",
      values: formVals
    };
  }

  const userExists = await getUserByUsername(username);
  if (userExists) {
    return {
      error: "Username already exists",
      values: formVals
    };
  }

  if (password !== passwordConfirm) {
    return {
      error: "Passwords do not match",
      values: { ...formVals, passwordConfirm: '' }
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({ username: formVals.username, name: formVals.name, passwordHash });
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: "An unexpected error occurred",
      values: formVals
    };
  }

  revalidatePath("/users");
  redirect("/login");
}

export const generateNewToken = async (formData: FormData) => {
  const username = formData.get("username") as string;
  if (!username) {
    return;
  };

  const newToken = randomUUID();
  try {
    await updateToken(username, newToken);
  }
  catch (error) {
    console.error("unexpected error", error)
  }

  revalidatePath("/me");
}