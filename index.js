require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Create an express application
const app = express();
const { PORT } = process.env;

// Connect to the database
dbConnection();

// Configure CORS
app.use(cors());


app.use("/api/users", require("./routes/users"));

// Listen to the root endpoint
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
