require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

async function connectToDatabase() {
  try {
    console.log("connecting to database...");
    return await mongoose
      .connect(uri, {
        dbName: dbName,
        retryReads: true,
        retryWrites: true,
        connectTimeoutMS: 12000,
      })
      .then((result) => {
        console.log("connected to database");
      });
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = { connectToDatabase };
