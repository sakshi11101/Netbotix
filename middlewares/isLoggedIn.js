const Company = require("../models/company");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");
const College = require("../models/college");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization").replace("Bearer", "");
  if (!token) {
    return next(new CustomError("Login First to Access the Page", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await College.findById(decoded.id);
  if (!req.user) {
    req.user = await Company.findById(decoded.id);
  }
  console.log(req.user);
  next();
});
