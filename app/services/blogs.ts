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

let nextId = 3;

export const getBlogs = () => {
    return blogs;
}

export const addBlog = (title: string, author: string, url: string) => {
    const newBlog = { id: nextId++, title, author, url, likes: 0 };
    blogs.push(newBlog);
    return newBlog;
}

export const getBlogById = (id: number) => {
    return blogs.find(blog => blog.id === id);
}