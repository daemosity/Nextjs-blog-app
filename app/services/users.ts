const users = [
  { id: 1, username: "aliceInChains", name: "Alice" },
  { id: 2, username: "bobHarley", name: "Bob" },
  { id: 3, username: "charlieX", name: "Charlie" },
];

export const getUsers = () => {
  return users;
};

export const getUserById = (id: number): typeof users[0] | null => {
    return users.find((user) => user.id === id) || null;
}