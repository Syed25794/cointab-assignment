const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({}, { strict: false });

const Data = mongoose.model("userdetails", dataSchema);

module.exports = Data;
