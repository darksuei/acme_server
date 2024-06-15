const express = require("express");
const { connectToDatabase } = require("./config/database.config");
const httpStatus = require("http-status");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const userRouter = require("./routes/userRoutes");
const goalRouter = require("./routes/goalRoutes");
const taskRouter = require("./routes/taskRoutes");

// Services
require("./services/passport");

// Initialize Express
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Session Configuration
app.use(
  session({
    secret: "secret",
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

// Health Check Route
app.get("/health", (_req, res) => {
  return res.status(httpStatus.OK).send("API is running..");
});

// Handle Undefined Routes
app.use((_req, res) => {
  return res.status(httpStatus.NOT_FOUND).json({ message: "Route not found" });
});

//Todo: Modularize server bootstrap
app.listen(5000, async () => {
  await connectToDatabase();
  console.log("Server is running on port 5000");
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
});
