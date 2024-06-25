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
const scheduleRouter = require("./routes/scheduleRoutes");
const moment = require("moment");
const cron = require("node-cron");

const Goal = require("./models/goal");
const User = require("./models/user");
const authenticateClient = require("./middlewares/authenticateClient");
const { sendTaskDeadlineEmail } = require("./services/novu");
const renderDashboardElements = require("./utils");
const scheduleEDF = require("./services/edf");

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
app.use("/api/schedule", scheduleRouter);

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

app.get("/dashboard", authenticateClient, async (req, res) => {
  const dashboardElements = await renderDashboardElements(req.user);

  return res.render("dashboard", dashboardElements);
});

app.get("/settings", authenticateClient, (req, res) => {
  const user = req.user;
  return res.render("settings", user);
});

app.get("/new-schedule", authenticateClient, async (req, res) => {
  const goals = await Goal.find({ userId: req.user._id, dueDate: { $gt: new Date() } });

  scheduleEDF(goals);

  goals.map((goal) => {
    goal.created = moment(goal.createdAt).fromNow();
    goal.deadline = moment(goal.dueDate).format("LL");
    return goal;
  });

  return res.render("newSchedule", {
    goals: goals.sort((a, b) => a.edfIndex - b.edfIndex),
    hasSchedule: req.user.hasSchedule,
    user: req.user,
  });
});

app.get("/schedule", authenticateClient, async (req, res) => {
  const goals = await Goal.find({ userId: req.user._id, dueDate: { $gt: new Date() } });

  goals.map((goal) => {
    goal.created = moment(goal.createdAt).fromNow();
    goal.deadline = moment(goal.dueDate).format("LL");
    return goal;
  });

  return res.render("schedule", {
    goals: goals.sort((a, b) => a.edfIndex - b.edfIndex),
    hasSchedule: req.user.hasSchedule,
    user: req.user,
  });
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

// Health Check Route
app.get("/health", (_req, res) => {
  return res.status(httpStatus.OK).send("API is running..");
});

// Handle Undefined Routes
app.use((_req, res) => {
  return res.status(httpStatus.NOT_FOUND).json({ message: "Route not found" });
});

//Cron Job to send email when a goal deadline has almost been reached (< 4 hours).
cron.schedule("0 * * * *", async () => {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 4 * 60 * 60 * 1000);

  const goals = await Goal.find({
    dueDate: {
      $gte: now,
      $lte: tomorrow,
    },
    hasSentDeadlineEmail: false,
  });

  goals.map(async (goal) => {
    const user = await User.findById(goal.userId);

    if (user.notifications === false) {
      return;
    }

    console.log(`Sending task deadline email to ${user.email} for goal ${goal.title}`);

    await sendTaskDeadlineEmail({
      id: user._id,
      email: user.email,
      taskName: goal.title,
    });

    goal.hasSentDeadlineEmail = true;
    await goal.save();
  });
});

// Server Bootstrap
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
});
