const express = require("express");
const connection = require("./config/database");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");
require("dotenv").config();
const { PORT }= process.env || 7000 ;

const app = express();

//Using cors to allow cross-origin sharing 
app.use(cors());

//Home route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Home page<h1>");
});

//All the routes will be used here
app.use(userRoutes);

//Listining on the PORT variable
app.listen(PORT, async () => {
  try {
    console.log(`Server is running on the localhost port:${PORT}`);
    connection;
    console.log("Connected with database.");
  } catch (error) {
    console.log("Something went wrong in connection with database.", error);
  }
});
