const fs = require("fs/promises");
const path = require("path");

// Build an absolute path to users.json
const USERS_FILE = path.join(__dirname, "../data/users.json");

// 1. Read all users
const getAllUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    const users = JSON.parse(data);
    return users;
  } catch (error) {
    throw error;
  }
};

// 2. Save all users
const saveUsers = async (users) => {
  const data = JSON.stringify(users, null, 2);

  await fs.writeFile(USERS_FILE, data, "utf-8");
};

// 3. Find user by email
const findUserByEmail = async (email) => {
  const users = await getAllUsers();

  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
};


module.exports = {
  getAllUsers,
  saveUsers,
  findUserByEmail,
};
