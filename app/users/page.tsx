import { getUsers } from "../services/users";

const Users = async () => {
  const usersList = getUsers();

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {usersList.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
