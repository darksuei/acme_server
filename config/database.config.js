const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

module.exports = {
  async connectToDatabase() {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(MONGO_URI);
      console.log("Successfully connected to database.");
    } catch (error) {
      console.log("Failed to connect to database.");
    }
  },
};
