const userService = require("../services/userService");

const registerUser = async (req, res, next) => {
  try {
    const userData = req.body;

    const newUser = await userService.createUser(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
};
