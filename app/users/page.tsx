const users = [
  { id: 1, username: "aliceInChains", name: "Alice" },
  { id: 2, username: "bobHarley", name: "Bob" },
  { id: 3, username: "charlieX", name: "Charlie" },
];

let nextId = 4;

const Users = async () => {
  const usersList = users;

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
