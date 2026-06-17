const blogs = [
  {
    id: 1,
    title: "First Blog Post",
    author: "John Doe",
    url: "/blogs/first-blog-post",
    likes: 0,
  },
  {
    id: 2,
    title: "Second Blog Post",
    author: "Jane Smith",
    url: "/blogs/second-blog-post",
    likes: 0,
  },
];

const Blogs = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url}>{blog.title}</a> by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
