const mongoose = require("mongoose");

module.exports = {
  async connectToDatabase() {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect("mongodb://localhost:27017/task_master");
      console.log("Database connected");
    } catch (error) {
      console.log("Database connection failed");
    }
  },
};
