const mongoose = require("mongoose");

//Creating schema of our whole data
const dataSchema = new mongoose.Schema({}, { strict: false });

//Creating model or our whole data
const Data = mongoose.model("userdetails", dataSchema);

module.exports = Data;
