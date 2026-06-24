import { notFound } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { generateNewToken } from "../actions/users";

const MyPage = async () => {
  const user = await getCurrentUser();
  if (!user) notFound();

  return (
    <>
      <h1>{"My Profile"}</h1>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
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
