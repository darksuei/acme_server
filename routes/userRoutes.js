const express = require("express");
const postRegister = require("../controllers/users/postRegister");
const postLogin = require("../controllers/users/postLogin");
const passport = require("passport");
const getUser = require("../controllers/users/getUser");
const authenticate = require("../middlewares/authenticate");
const patchUser = require("../controllers/users/patchUser");

const router = express.Router();

router.route("/get-user").get(authenticate, getUser);

router.route("/register").post(postRegister);

router.route("/login").post(passport.authenticate("local"), postLogin);

router.route("/update-user").patch(authenticate, patchUser);

module.exports = router;
