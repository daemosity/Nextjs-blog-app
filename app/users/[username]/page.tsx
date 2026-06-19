import { notFound } from "next/navigation";
import { getUserByUsername } from "../../services/users";
import Link from "next/link";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <p>IRL Name: {user.name}</p>
      <h2>Blog Submissions</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
