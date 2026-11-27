const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health Check API
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FinEdge API is running",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`FinEdge server running on port ${PORT}`);
});