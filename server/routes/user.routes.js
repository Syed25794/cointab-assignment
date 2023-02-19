const { Router } = require("express");
const checkParameters = require("../middlewares/user.getData");

const { getData, deleteData, getUsersData, filterUsersData } = require("./../actions/user.action");

const userRoutes = Router();

userRoutes.get("/fetchData", getData);
userRoutes.delete("/deleteData", deleteData);
userRoutes.get("/getUsersData",checkParameters,getUsersData);
userRoutes.get("/filterData",checkParameters,filterUsersData);

module.exports = userRoutes;
