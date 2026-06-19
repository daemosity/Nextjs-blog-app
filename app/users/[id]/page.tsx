import { notFound } from "next/navigation";
import { getUserById } from "../../services/users";

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUserById(Number(id));

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <p>IRL Name: {user.name}</p>
    </div>
  );
};

export default UserPage;
