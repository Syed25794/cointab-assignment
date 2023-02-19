const { Router } = require("express");
const checkParameters = require("../middlewares/user.getData");
const { getData, deleteData, getUsersData, filterUsersData } = require("./../actions/user.action");

const userRoutes = Router();


//Differents routes for fetching deleting and getting user data

userRoutes.get("/fetchData", getData);
userRoutes.delete("/deleteData", deleteData);
userRoutes.get("/getUsersData",checkParameters,getUsersData);

module.exports = userRoutes;
