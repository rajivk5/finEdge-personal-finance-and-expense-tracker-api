const transactionService = require("../services/transactionService");

// POST /transactions
const createTransaction = async (req, res, next) => {
  try {
    // Get transaction data from request
    const transactionData = req.body;

    // Call service
    const newTransaction =
      await transactionService.createTransaction(transactionData);

    // Send response
    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: newTransaction,
    });
  } catch (error) {
    next(error);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    // Get userId from query parameters
    const { userId } = req.query;

    if (!userId) {
      const error = new Error("userId is required");
      error.statusCode = 400;
      throw error;
    }

    // Call service
    const transactions =
      await transactionService.getTransactionsByUserId(userId);

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      const error = new Error("userId is required");
      error.statusCode = 400;
      throw error;
    }

    const transaction = await transactionService.getTransactionById(id, userId);

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const updateData = req.body;

    if (!userId) {
      const error = new Error("userId is required");
      error.statusCode = 400;
      throw error;
    }

    const updatedTransaction = await transactionService.updateTransaction(
      id,
      userId,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      const error = new Error("userId is required");
      error.statusCode = 400;
      throw error;
    }

    await transactionService.deleteTransaction(id, userId);

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
