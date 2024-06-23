const express = require("express");
const authenticate = require("../middlewares/authenticate");
const postCreateGoal = require("../controllers/goals/postCreateGoal");
const getGoals = require("../controllers/goals/getGoals");
const patchGoal = require("../controllers/goals/patchGoal");
const deleteGoal = require("../controllers/goals/deleteGoal");
const getGoalById = require("../controllers/goals/getGoalById");

const router = express.Router();

router.route("/create-goal").post(authenticate, postCreateGoal);

router.route("/get-goals").get(authenticate, getGoals);

router.route("/get-goal/:id").get(authenticate, getGoalById);

router.route("/update-goal/:id").patch(authenticate, patchGoal);

router.route("/delete-goal/:id").delete(authenticate, deleteGoal);

module.exports = router;
