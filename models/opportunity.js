const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please provide company name"],
  },
  jobTitle: {
    type: String,
    required: [true, "Please provide job Title"],
  },
  jobDesc: {
    type: String,
    required: [true, "Please provide job Description"],
  },
  eligibility: {
    type: String,
    required: [true, "Please provide job Eligibility Criteria"],
  },
  country: {
    type: String,
    required: [true, "Please provide Country"],
  },
  state: {
    type: String,
    required: [true, "Please provide State"],
  },

  typeOfJob: {
    type: String,
    required: [true, "Please provide type of job"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Opportunnity", opportunitySchema);
