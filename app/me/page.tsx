import { notFound } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { generateNewToken } from "../actions/users";
import Link from "next/link";
import { getUserReadingList } from "../services/readingList";
import { markRead } from "../actions/readingList";

const MyPage = async () => {
  const user = await getCurrentUser();
  if (!user) notFound();

  const readingList = await getUserReadingList(user.id);
  const unreadList = readingList.filter((listItem) => listItem.read === false);
  const readList = readingList.filter((listItem) => listItem.read === true);
  return (
    <>
      <h1>{"My Profile"}</h1>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <hr />
      <h2>Reading List</h2>
      <h3>Unread ({unreadList.length})</h3>
      <ul>
        {unreadList.map(({ blog }) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>{" "}
            <form action={markRead}>
              <input type="hidden" name="blogId" value={blog.id} />
              <input type="hidden" name="userId" value={user.id} />
              <button type="submit">mark as read</button>
            </form>
          </li>
        ))}
      </ul>
      <h3>Read ({readList.length})</h3>
      <ul>
        {readList.map(({ blog }) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <h2>API Token</h2>
      <p>Current token: {user.token ?? "None"}</p>
      <form action={generateNewToken}>
        <input type="hidden" name="username" value={user.username} />
        <button type="submit">Generate New Token</button>
      </form>
    </>
  );
};

export default MyPage;
