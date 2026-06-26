import Link from "next/link";
import { getBlogs } from "@/app/services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = (await getBlogs()).sort((a, b) => b.likes - a.likes);

  const blogs = filter
    ? allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase()),
      )
    : allBlogs;

  return (
    <div>
      <h2>Blogs</h2>
      <form>
        <input
          data-testid="filter-input"
          type="text"
          name="filter"
          placeholder="Search blogs..."
          defaultValue={filter}
        />
        <button data-testid="search-button" type="submit">
          Search
        </button>
      </form>
      <ul data-testid="blogs-list">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by{" "}
            {blog.author} {`${blog.likes} likes`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
