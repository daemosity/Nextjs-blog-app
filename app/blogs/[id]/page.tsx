import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";
import { addLike } from "@/app/actions/blogs";
import { getCurrentUserReadingList } from "@/app/services/session";
import { addToReadingList } from "@/app/actions/readingList";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const user = await getCurrentUserReadingList();
  const currReadingList: Set<number> = new Set(
    user?.readingList.map((listItem) => listItem.blogId),
  );

  return (
    <div data-testid="blog-detail">
      <h1 data-testid="blog-title">{blog.title}</h1>
      <p data-testid="blog-author">By {blog.author}</p>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>
      <form action={addLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
      {user && !currReadingList.has(blog.id) ? (
        <form action={addToReadingList}>
          <input type="hidden" name="blogId" value={blog.id} />
          <input type="hidden" name="userId" value={user.id} />
          <button data-testid="add-to-reading-list-button" type="submit">
            add to reading list
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default BlogPage;
