const mongoose = require('mongoose');

// Replace <username>, <password>, <cluster-name>, and <database-name> with your actual MongoDB Atlas credentials
const MONGO_URI = process.env.MONGO_URI;

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
