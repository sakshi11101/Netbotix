const Company = require("../models/company");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const bcrypt = require("bcryptjs");
const  cookieToken = require('../utils/cookieToken')

exports.signup = BigPromise(async (req, res, next) => {
  const { companyName, companyEmail, HR_Email, HR_Name, password } = req.body;
  if (!companyName || !companyEmail || !HR_Email || !HR_Name || !password) {
    return next(new CustomError("Please provide all data", 400));
  }

  const  encpassword = await bcrypt.hash(password,10)

  const company = await Company.create({
    companyName,
    companyEmail,
    HR_Email,
    HR_Name,
    password:encpassword,
  });

  res.status(201).json({
    success:true,
    message:"Company account created successfully you can now login"
  })
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email ||  !password) {
    return next(new CustomError("please provide email and password"));
  }
  const company = await Company.findOne({ companyEmail:email }).select("password");

  if (!company) {
    return next(new CustomError("You are not registered", 400));
  }
  const isPasswordCorrect = await bcrypt.compare(password, company.password);
  if (!isPasswordCorrect) {
    return next(new CustomError("Email or password do not match", 400));
  }
  cookieToken(company, res);
});
