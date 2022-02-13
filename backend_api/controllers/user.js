const College = require("../models/college");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const bcrypt = require("bcryptjs");
const cookieToken = require("../utils/cookieToken");
const Company = require("../models/company");


exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, Contact_Name, Contact_Email, password, type } = req.body;
  if (!name || !email || !Contact_Name || !Contact_Email || !password) {
    return next(new CustomError("Please provide all data", 400));
  }

  const encpassword = await bcrypt.hash(password, 10);

  if (type === "c") {
    const company = await Company.create({
      companyName: name,
      companyEmail: email,
      HR_Email: Contact_Name,
      HR_Name: Contact_Email,
      password: encpassword,
    });
    res.status(201).json({
      success: true,
      message: "Company account created successfully you can now login",
    });
    console.log(company);
  }
  if (type === "t") {
    const college = await College.create({
      collegeName: name,
      collegeEmail: email,
      TP_Email: Contact_Name,
      TP_Name: Contact_Email,
      password: encpassword,
    });
    res.status(201).json({
      success: true,
      message: "College account created successfully you can now login",
    });
  }else{
    return next(new CustomError("Please provide all data", 400));
  }
  
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password ,type} = req.body;

  if (!email || !password || !type) {
    return next(new CustomError("please provide email and password and type of user"));
  }

  let user = ''


if (type == 'c') {
   user = await Company.findOne({ companyEmail: email }).select(
    "password"
  );
}else if (type == 't') {
  user = await College.findOne({ collegeEmail: email }).select(
    "password"
  );
} else {
  return next(new CustomError("please provide type of user"));
}

  if (!user) {
    return next(new CustomError("You are not registered", 400));
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new CustomError("Email or password do not match", 400));
  }
  cookieToken(user, res);
});
