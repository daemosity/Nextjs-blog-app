import { createBlog } from "@/app/actions/blogs";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const NewBlog = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <div>
      <h2>Create New Blog</h2>
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
    </div>
  );
};

export default NewBlog;
