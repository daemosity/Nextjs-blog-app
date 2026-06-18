import { createBlog } from "@/app/actions/blogs";

const NewBlog = () => {
  return (
    <div>
      <h2>Create New Blog</h2>
      <form action={createBlog}>
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
      </form>
    </div>
  );
};

export default NewBlog;
