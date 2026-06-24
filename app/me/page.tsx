import { notFound } from "next/navigation";
import { getCurrentUser } from "../services/session";

const MyPage = async () => {
  const user = await getCurrentUser();
  if (!user) notFound();

  return (
    <>
      <h1>{"My Profile"}</h1>
      <p>Name: {user.name}</p>
      <p>UserName: {user.username}</p>
      <hr />
      <h2>API Token</h2>
      <p>Current token: None</p>
    </>
  );
};

export default MyPage;
