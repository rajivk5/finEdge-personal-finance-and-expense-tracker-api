
const calculateSummary = (transactions) => {

  // Calculate total income
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate total expenses
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate balance
  const balance = totalIncome - totalExpenses;

  // Calculate savings rate
  const savingsRate = totalIncome > 0
    ? Number(((balance / totalIncome) * 100).toFixed(2))
    : 0;

  return {
    totalIncome,
    totalExpenses,
    balance,
    savingsRate
  };
};

module.exports = {
  calculateSummary
};
