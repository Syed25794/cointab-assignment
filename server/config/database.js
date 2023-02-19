const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set('strictQuery',false);

//Importing mongoDB url

const { MONGO_URL } = process.env;

//Connecting to MongoDB by mongoose

const  connection =  mongoose.connect(MONGO_URL);

module.exports = connection ;