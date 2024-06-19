const express = require("express");
require("dotenv").config();
const path = require("path");
const { connectToDatabase } = require("./config/database.config");
const httpStatus = require("http-status");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const userRouter = require("./routes/userRoutes");
const goalRouter = require("./routes/goalRoutes");
const taskRouter = require("./routes/taskRoutes");
const moment = require("moment");

const Task = require("./models/task");
const Goal = require("./models/goal");
const authenticateClient = require("./middlewares/authenticateClient");

// Services
require("./services/passport");

// Initialize Express
const app = express();

const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the directory where your EJS templates are located
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Session Configuration
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes Configuration
app.use("/api/user", userRouter);
app.use("/api/goal", goalRouter);
app.use("/api/task", taskRouter);

// Home Route
app.get("/", (_req, res) => {
  return res.render("index");
});
app.get("/login", (_req, res) => {
  return res.render("login");
});
app.get("/signup", (_req, res) => {
  return res.render("signup");
});

// Todo: Require login on dashboard

app.get("/dashboard", authenticateClient, async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  const goals = await Goal.find({ userId: req.user._id });
  const currentDate = moment().format("dddd, Do MMMM");

  tasks.map((task) => {
    task.created = moment(task.createdAt).fromNow();
    return task;
  });

  goals.map((goal) => {
    goal.created = moment(goal.createdAt).fromNow();
    return goal;
  });

  return res.render("dashboard", { tasks, goals, currentDate });
});

app.get("/settings", authenticateClient, (req, res) => {
  const user = req.user;
  return res.render("settings", user);
});

// Health Check Route
app.get("/health", (_req, res) => {
  return res.status(httpStatus.OK).send("API is running..");
});

// Handle Undefined Routes
app.use((_req, res) => {
  return res.status(httpStatus.NOT_FOUND).json({ message: "Route not found" });
});

// Server Bootstrap
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
});
