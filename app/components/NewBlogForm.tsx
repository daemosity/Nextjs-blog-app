"use client";

import { useActionState } from "react";
import { createBlog, BlogFormState } from "@/app/actions/blogs";

const initialState: BlogFormState = {
  error: "",
  values: { title: "", author: "", url: "" },
};

const NewBlogForm = () => {
  const [state, formAction] = useActionState(createBlog, initialState);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={state.values?.title}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          defaultValue={state.values?.author}
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          name="url"
          placeholder="url"
          defaultValue={state.values?.url}
        />
      </div>
      <button type="submit">Submit</button>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  );
};

export default NewBlogForm;
