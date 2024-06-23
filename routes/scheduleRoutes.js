const express = require("express");
const postGenerateSchedule = require("../controllers/schedules/postGenerateSchedule");
const authenticate = require("../middlewares/authenticate");
const patchGivePriority = require("../controllers/schedules/patchGivePriority");

const router = express.Router();

router.route("/create-schedule").post(authenticate, postGenerateSchedule);

router.route("/update-schedule-priority/:id").patch(authenticate, patchGivePriority);

module.exports = router;
