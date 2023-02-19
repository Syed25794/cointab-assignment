const express = require("express");
const connection = require("../config/database");
const userRoutes = require("../routes/user.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Home page<h1>");
});

app.use(userRoutes);

app.listen(8070, async () => {
  try {
    console.log(`Server is running on the localhost port:8070`);
    connection;
    console.log("Connected with database.");
  } catch (error) {
    console.log("Something went wrong in connection with database.", error);
  }
});
