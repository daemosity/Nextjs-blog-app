import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const usersList = await getUsers();

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {usersList.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
