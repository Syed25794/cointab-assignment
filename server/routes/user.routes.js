const { Router } = require("express");

const { getData, deleteData, getUsersData, filterUsersData } = require("./../actions/user.action");

const userRoutes = Router();

userRoutes.get("/fetchData", getData);
userRoutes.delete("/deleteData", deleteData);
userRoutes.get("/getUsersData",getUsersData);
userRoutes.get("/filterData",filterUsersData);

module.exports = userRoutes;
