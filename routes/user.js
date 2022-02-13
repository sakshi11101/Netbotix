const express = require("express");
const {
  showOpportunities,
  addOpportunity,
} = require("../controllers/opportunity");
const { signup, login } = require("../controllers/user");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/opportunity").get(isLoggedIn, showOpportunities);
router.route("/opportunity").post(isLoggedIn, addOpportunity);

module.exports = router;
