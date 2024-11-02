const mongoose = require("mongoose");

const { DB_CONNECTION } = process.env;

if (!DB_CONNECTION) {
  throw new Error("Please set the environment variables for the database");
}

const dbConnection = async () => {
  try {
    mongoose.connect(DB_CONNECTION);

    console.log("Database connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error initializing database, please check logs");
  }
};

module.exports = {
  dbConnection,
};
