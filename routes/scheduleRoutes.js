const express = require("express");
const postGenerateSchedule = require("../controllers/schedules/postGenerateSchedule");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.route("/create-schedule").post(authenticate, postGenerateSchedule);

module.exports = router;
