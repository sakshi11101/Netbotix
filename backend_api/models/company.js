const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please provide company name"],
  },
  companyEmail: {
    type: String,
    required: [true, "Please provide email"],
  },
  HR_Email: {
    type: String,
    required: [true, "Please provide HR email"],
  },
  HR_Name: {
    type: String,
    required: [true, "Please provide Hr Name"],
  },
  type:{
    type:String,
    default:"c"
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Company", companySchema);
