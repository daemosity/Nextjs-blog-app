import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-lg text-gray-700">By {blog.author}</p>
      <a
        href={blog.url}
        className="text-lg text-gray-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        {blog.url}
      </a>
      <p className="text-lg text-gray-700">{blog.likes} likes</p>
    </div>
  );
};

export default BlogPage;
