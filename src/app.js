const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FinEdge API is running",
  });
});

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Global error handler (must be after routes)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

const transactionRoutes = require("./routes/transactionRoutes");

app.use("/transactions", transactionRoutes);



const summaryRoutes = require("./routes/summaryRoutes");

app.use("/summary", summaryRoutes);




app.listen(PORT, () => {
  console.log(`FinEdge server running on port ${PORT}`);
});
