"use client";

import { createBlog } from "@/app/actions/blogs";

const NewBlogForm = () => {
  return (
    <form action={createBlog}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          minLength={5}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          required
          minLength={5}
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          name="url"
          placeholder="url"
          required
          minLength={5}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewBlogForm;
