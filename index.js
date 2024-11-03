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

// Parse the body of the request
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/auth"));

// Listen to the root endpoint
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
