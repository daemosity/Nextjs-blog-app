import { notFound } from "next/navigation";
import { getUserByUsername } from "@/app/services/users";
import Link from "next/link";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  console.log(username);
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <p>IRL Name: {user.name}</p>
      <hr />
      {user.blogs.length > 0 ? (
        <>
          <h3>Blog Submissions</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h3>No blogs submitted... yet.</h3>
      )}
    </div>
  );
};

export default UserPage;
