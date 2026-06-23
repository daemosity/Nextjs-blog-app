"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog, ActionStatus } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";

const initialState: ActionStatus = {
  error: "",
  success: false,
};

const NewBlogForm = () => {
  const [state, formAction] = useActionState(createBlog, initialState);

  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" placeholder="Title" />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" name="author" placeholder="Author" />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input type="text" name="url" placeholder="url" />
      </div>
      <button type="submit">Submit</button>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  );
};

export default NewBlogForm;
