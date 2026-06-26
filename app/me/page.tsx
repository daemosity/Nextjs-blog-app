import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { generateNewToken } from "../actions/users";
import Link from "next/link";
import { getUserReadingList } from "../services/readingList";
import { markRead } from "../actions/readingList";

const MyPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const readingList = await getUserReadingList(user.id);
  const unreadList = readingList.filter((listItem) => listItem.read === false);
  const readList = readingList.filter((listItem) => listItem.read === true);
  return (
    <>
      <h1 data-testid="user-profile">{"My Profile"}</h1>
      <p data-testid="user-name">Name: {user.name}</p>
      <p data-testid="user-username">Username: {user.username}</p>
      <hr />
      <h2 data-testid="reading-list-section">Reading List</h2>
      {readingList.length > 0 ? (
        <>
          {unreadList.length > 0 ? (
            <>
              <h3>Unread ({unreadList.length})</h3>
              <ul data-testid="unread-section">
                {unreadList.map(({ blog }) => (
                  <li key={blog.id}>
                    <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>{" "}
                    <form action={markRead}>
                      <input type="hidden" name="blogId" value={blog.id} />
                      <input type="hidden" name="userId" value={user.id} />
                      <button
                        data-testid={`mark-read-${blog.id}`}
                        type="submit"
                      >
                        mark as read
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h3 data-testid="no-unread-blogs">
              {"You've read your whole list - why not add some more?"}
            </h3>
          )}
          {readList.length > 0 ? (
            <>
              <h3>Read ({readList.length})</h3>
              <ul>
                {readList.map(({ blog }) => (
                  <li key={blog.id}>
                    <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <h4 data-testid="empty-reading-list">
          No blogs to read yet - fill me up!
        </h4>
      )}
      <hr />
      <h2 data-testid="api-token-section">API Token</h2>
      {user.token ? (
        <>
          <p data-testid="token-display">Current token:</p>
          <p data-testid="api-token">{user.token}</p>
        </>
      ) : (
        <p data-testid="no-token-message">Current token: None</p>
      )}
      <form action={generateNewToken}>
        <input type="hidden" name="username" value={user.username} />
        <button data-testid="generate-token-button" type="submit">
          Generate New Token
        </button>
      </form>
    </>
  );
};

export default MyPage;
