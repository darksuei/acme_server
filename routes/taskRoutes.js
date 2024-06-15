const express = require("express");
const authenticate = require("../middlewares/authenticate");
const postCreateTask = require("../controllers/tasks/postCreateTask");
const getTasks = require("../controllers/tasks/getTasks");
const deleteTask = require("../controllers/tasks/deleteTask");
const patchTask = require("../controllers/tasks/patchTask");

const router = express.Router();

router.route("/create-task").post(authenticate, postCreateTask);

router.route("/get-tasks").get(authenticate, getTasks);

router.route("/delete-task/:id").delete(authenticate, deleteTask);

router.route("/update-task/:id").patch(authenticate, patchTask);

module.exports = router;
