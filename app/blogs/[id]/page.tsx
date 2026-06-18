import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { addLike } from "@/app/actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>By {blog.author}</p>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>
      <form action={addLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </div>
  );
};

export default BlogPage;
