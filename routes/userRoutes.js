const express = require("express");
const postRegister = require("../controllers/users/postRegister");
const postLogin = require("../controllers/users/postLogin");
const passport = require("passport");
const authenticate = require("../middlewares/authenticate");
const postUpdateUser = require("../controllers/users/postUpdateUser");

const router = express.Router();

router.route("/register").post(postRegister);

router.route("/login").post(passport.authenticate("local"), postLogin);

router.route("/update-user").post(authenticate, postUpdateUser);

module.exports = router;
