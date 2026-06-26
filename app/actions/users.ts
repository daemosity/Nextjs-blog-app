"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { getUserByUsername, insertUser, updateToken } from '../services/users';
import { ActionStatus } from "../components/NotificationContext";

const initialState: ActionStatus = {
  error: "",
  success: false,
  testFlag: ""
};

export const registerUser = async (
  prevState: ActionStatus,
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
      success: false,
      testFlag: "username-error"
    };
  }

  const userExists = await getUserByUsername(username);
  if (userExists) {
    return {
      error: "Username already exists",
      success: false,
    };
  }

  if (password !== passwordConfirm) {
    return {
      error: "Passwords do not match",
      success: false,
      testFlag: "passwordConfirm-error"
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await insertUser(formVals.username, formVals.name, passwordHash);
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: "An unexpected error occurred",
      success: false,
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