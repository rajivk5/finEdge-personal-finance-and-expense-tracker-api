const { randomUUID } = require("crypto");

const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userModel");

const createTransaction = async (transactionData) => {
  const { userId, type, category, amount, description, date } = transactionData;

  // 1. Check whether user exists
  const users = await userModel.getAllUsers();

  const userExists = users.find((user) => user.id === userId);

  if (!userExists) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // 2. Validate transaction type
  if (!["income", "expense"].includes(type)) {
    const error = new Error("Invalid transaction type");
    error.statusCode = 400;
    throw error;
  }

  // 3. Validate amount
  if (!Number.isFinite(amount) || amount <= 0) {
    const error = new Error("Amount must be a positive number");
    error.statusCode = 400;
    throw error;
  }

  // 4. Validate category
  if (typeof category !== "string" || !category.trim()) {
    const error = new Error("Category is required");
    error.statusCode = 400;
    throw error;
  }

  // 5. Create transaction
  const newTransaction = {
    id: randomUUID(),
    userId,
    type,
    category: category.trim().toLowerCase(),
    amount,
    description: description || "",
    date: date || new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
  };

  // 6. Save transaction
  const transactions = await transactionModel.getAllTransactions();

  transactions.push(newTransaction);

  await transactionModel.saveTransactions(transactions);

  return newTransaction;
};

const getTransactionsByUserId = async (userId) => {
  // 1. Check whether user exists
  const users = await userModel.getAllUsers();

  const userExists = users.find((user) => user.id === userId);

  if (!userExists) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // 2. Get all transactions
  const transactions = await transactionModel.getAllTransactions();

  // 3. Filter transactions by userId
  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === userId,
  );

  return userTransactions;
};

const getTransactionById = async (id, userId) => {
  // 1. Find transaction
  const transaction = await transactionModel.findTransactionById(id);

  // 2. Check transaction exists
  if (!transaction) {
    const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }

  // 3. Check transaction ownership
  if (transaction.userId !== userId) {
    const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }

  return transaction;
};

const updateTransaction = async (id, userId, updateData) => {
  const transactions = await transactionModel.getAllTransactions();

  const index = transactions.findIndex(
    (transaction) => transaction.id === id && transaction.userId === userId,
  );

  if (index === -1) {
    const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = ["type", "category", "amount", "description", "date"];

  const updates = Object.keys(updateData);

  if (updates.length === 0) {
    const error = new Error("No update data provided");
    error.statusCode = 400;
    throw error;
  }

  const invalidFields = updates.filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length > 0) {
    const error = new Error(`Invalid fields: ${invalidFields.join(", ")}`);
    error.statusCode = 400;
    throw error;
  }

  // Validate updated values
  if (
    updateData.type !== undefined &&
    !["income", "expense"].includes(updateData.type)
  ) {
    const error = new Error("Invalid transaction type");
    error.statusCode = 400;
    throw error;
  }

  if (
    updateData.amount !== undefined &&
    (!Number.isFinite(updateData.amount) || updateData.amount <= 0)
  ) {
    const error = new Error("Amount must be a positive number");
    error.statusCode = 400;
    throw error;
  }

  if (
    updateData.category !== undefined &&
    (typeof updateData.category !== "string" || !updateData.category.trim())
  ) {
    const error = new Error("Invalid category");
    error.statusCode = 400;
    throw error;
  }

  // Update existing transaction
  transactions[index] = {
    ...transactions[index],
    ...updateData,
    category:
      updateData.category !== undefined
        ? updateData.category.trim().toLowerCase()
        : transactions[index].category,
  };

  await transactionModel.saveTransactions(transactions);

  return transactions[index];
};



const deleteTransaction = async (id, userId) => {
  // 1. Get all transactions
  const transactions = await transactionModel.getAllTransactions();

  // 2. Find transaction belonging to this user
  const index = transactions.findIndex(
    (transaction) =>
      transaction.id === id && transaction.userId === userId
  );

  // 3. Check whether transaction exists
  if (index === -1) {
    const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }

  // 4. Remove transaction
  const deletedTransaction = transactions.splice(index, 1)[0];

  // 5. Save updated transactions
  await transactionModel.saveTransactions(transactions);

  return deletedTransaction;
};


module.exports = {
  createTransaction,
  getTransactionsByUserId,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};
