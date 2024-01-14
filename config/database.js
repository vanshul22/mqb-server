const mongoose = require('mongoose');

// Replace <username>, <password>, <cluster-name>, and <database-name> with your actual MongoDB Atlas credentials
const MONGO_URI = process.env.MONGO_URI || "mongodb://vanshul22:1234567890@localhost:27017";

const connectDB = async () => {
  try {
    const mongo = await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected…');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;