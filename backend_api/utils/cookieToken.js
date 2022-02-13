const jwt = require('jsonwebtoken');


const cookieToken = (user,res) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: (user.type === 'c') ? user.companyEmail : user.collegeEmail,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  )
  const options = {
    expires: new Date(Date.now() + (process.env.COOKIE_TIME * process.env.DAYS)),
    httpOnly: true,
  };


  user.password = undefined; 

  res.status(200).cookie("token", token, options).json({
    sucess: true,
    token,
    user,
  });
 
}

module.exports = cookieToken;
