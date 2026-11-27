const fs = require("fs/promises");
const path = require("path");

const TRANSACTIONS_FILE = path.join(__dirname, "../data/transactions.json");

// 1. Get all transactions
const getAllTransactions = async () => {
  const data = await fs.readFile(TRANSACTIONS_FILE, "utf-8");

  return JSON.parse(data);
};

// 2. Save transactions
const saveTransactions = async (transactions) => {
  const data = JSON.stringify(transactions, null, 2);

  await fs.writeFile(TRANSACTIONS_FILE, data, "utf-8");
};

// 3. Find transaction by ID
const findTransactionById = async (id) => {
  const transactions = await getAllTransactions();

  return transactions.find((transaction) => transaction.id === id);
};

module.exports = {
  getAllTransactions,
  saveTransactions,
  findTransactionById,
};
