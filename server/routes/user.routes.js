const { Router } = require("express");
const checkParameters = require("../middlewares/user.getData");
const { getData, deleteData, getUsersData,getUserAgeCount } = require("./../actions/user.action");

const userRoutes = Router();


//Differents routes for fetching deleting and getting user data

userRoutes.get("/fetchData", getData);
userRoutes.delete("/deleteData", deleteData);
userRoutes.get("/getUsersData",checkParameters,getUsersData);
userRoutes.get("/ageFilter",getUserAgeCount);

module.exports = userRoutes;
