const validateURL = require("../utils/validateURL");
const urlValidator = async (req, res, next) => {
  try {
    await validateURL(req.body.url);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = urlValidator;
