"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/app/actions/blogs";
import {
  ActionStatus,
  useNotification,
} from "@/app/components/NotificationContext";

export const initialState: ActionStatus = {
  error: "",
  success: false,
};

const NewBlogForm = () => {
  const [state, formAction] = useActionState(createBlog, initialState);

  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!", "success", "notification");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="blog-title">Title</label>
        <input type="text" id="blog-title" name="title" placeholder="Title" />
      </div>
      <div>
        <label htmlFor="blog-author">Author</label>
        <input
          type="text"
          id="blog-author"
          name="author"
          placeholder="Author"
        />
      </div>
      <div>
        <label htmlFor="blog-url">URL</label>
        <input type="text" id="blog-url" name="url" placeholder="url" />
      </div>
      <button data-testid="create-blog-button" type="submit">
        Create
      </button>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  );
};

export default NewBlogForm;
