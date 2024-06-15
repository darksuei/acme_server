const express = require("express");
const authenticate = require("../middlewares/authenticate");
const postCreateTask = require("../controllers/tasks/postCreateTask");
const getTasks = require("../controllers/tasks/getTasks");
const deleteTask = require("../controllers/tasks/deleteTask");

const router = express.Router();

router.route("/create-task").post(authenticate, postCreateTask);

router.route("/get-tasks").get(authenticate, getTasks);

router.route("/delete-task/:id").delete(authenticate, deleteTask);

module.exports = router;
