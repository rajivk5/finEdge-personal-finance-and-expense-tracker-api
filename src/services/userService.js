
const bcrypt = require("bcrypt");
const { randomUUID } = require("crypto");

const userModel = require("../models/userModel");

const createUser = async (userData) => {
  const { name, email, password } = userData;

  // 1. Check whether email already exists
  const existingUser = await userModel.findUserByEmail(email);

  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user object
  const newUser = {
    id: randomUUID(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  // 4. Get existing users
  const users = await userModel.getAllUsers();

  // 5. Add new user
  users.push(newUser);

  // 6. Save users
  await userModel.saveUsers(users);

  // 7. Never return password
  const { password: _, ...safeUser } = newUser;

  return safeUser;
};

module.exports = {
  createUser
};
