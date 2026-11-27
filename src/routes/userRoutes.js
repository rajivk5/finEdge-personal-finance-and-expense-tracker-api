const express = require("express");
const transactionController = require("../controllers/transactionController");

const userController = require("../controllers/userController");
const { validateUser } = require("../middleware/validator");

const router = express.Router();

router.post("/", validateUser, userController.registerUser);
router.get("/", transactionController.getTransactions);

module.exports = router;