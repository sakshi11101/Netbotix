const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: [true, "Please provide company name"],
  },
  collegeEmail: {
    type: String,
    required: [true, "Please provide email"],
  },
  TP_Email: {
    type: String,
    required: [true, "Please provide HR email"],
  },
  TP_Name: {
    type: String,
    required: [true, "Please provide Hr Name"],
  },
  type:{
    type:String,
    default:"t"
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

module.exports = mongoose.model("College", collegeSchema);
