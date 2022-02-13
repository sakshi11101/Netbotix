const CustomError = require("../utils/customError");
const BigPromise = require("../middlewares/bigPromise");
const Opportunity = require('../models/opportunity'); 

exports.addOpportunity = BigPromise(async (req, res, next) => {
  if (!(req.user.type === 'c')) {
    return next(new CustomError('You are not allowed to send the data'))
  }
  let { companyName, jobTitle, jobDesc, eligibility, country ,state, typeOfJob } =
    req.body;

  if (
    !companyName ||
    !jobTitle ||
    !jobDesc ||
    !eligibility ||
    !typeOfJob
  ) {
    return next(new CustomError("Please send all data"));
  }

  const data = {
    companyName,
    jobTitle,
    jobDesc,
    eligibility,
    country,
    state,
    typeOfJob,
  };

  await Opportunity.create(data);

  res.status(201).json({
    success:true,
    message:"Opportunity added succussfully."
  })
});


exports.showOpportunities = BigPromise(async (req,res,next) => {
  if (!(req.user.type === 't')) {
    return next(new CustomError('You are not allowed to access this data'))
  }
  const opportunities = await Opportunity.find()
  res.status(200).json({
    success:true,
    data:{
      length:opportunities.length,
      opportunities
    }
  })
})