const express = require("express");
const postRegister = require("../controllers/users/postRegister");
const postLogin = require("../controllers/users/postLogin");
const authenticate = require("../middlewares/authenticate");
const postUpdateUser = require("../controllers/users/postUpdateUser");
const postChangePassword = require("../controllers/users/postChangePassword");
const postOtherSettings = require("../controllers/users/postOtherSettings");

const router = express.Router();

router.route("/register").post(postRegister);

router.route("/login").post(postLogin);

router.route("/update-user").post(authenticate, postUpdateUser);

router.route("/update-password").post(authenticate, postChangePassword);

router.route("/update-other-settings").post(authenticate, postOtherSettings);

module.exports = router;
