
const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userModel");

const { calculateSummary } = require("../utils/analytics");

const getUserSummary = async (userId) => {

  // 1. Check whether user exists
  const users = await userModel.getAllUsers();

  const userExists = users.find(
    (user) => user.id === userId
  );

  if (!userExists) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // 2. Fetch all transactions
  const transactions = await transactionModel.getAllTransactions();

  // 3. Filter transactions by user
  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === userId
  );

  // 4. Calculate financial summary
  const summary = calculateSummary(userTransactions);

  return {
    userId,
    transactionCount: userTransactions.length,
    ...summary
  };
};

module.exports = {
  getUserSummary
};
