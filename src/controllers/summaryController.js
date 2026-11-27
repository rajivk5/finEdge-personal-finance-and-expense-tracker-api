
const summaryService = require("../services/summaryService");

const getSummary = async (req, res, next) => {
  try {

    // Get userId from query parameters
    const { userId } = req.query;

    if (!userId) {
      const error = new Error("userId is required");
      error.statusCode = 400;
      throw error;
    }

    // Call service
    const summary = await summaryService.getUserSummary(userId);

    res.status(200).json({
      success: true,
      data: summary
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSummary
};
