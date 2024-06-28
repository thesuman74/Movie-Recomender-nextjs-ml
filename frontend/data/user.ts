const users = [
  {
    name: "Suman Adhikari",

    email: "atapas@email.com",
    password: "password",
  },
  {
    name: "Suman Adhikari",
    email: "all@gmail.com",
    password: "all",
  },
  {
    name: "Suman Adhikari",

    email: "bob@email.com",
    password: "password",
  },
];
export const getUserByEmail = (email: string) => {
  const found = users.find((user) => user.email === email);
  return found;
};
