const https = require("node:https");
const Data = require("../models/Data.model");

const getData = async (req, res) => {
  try {
    const options = {
      hostname: "randomuser.me",
      path: "/api/?results=100",
      method: "GET",
    };

    let data = "";

    const req = https.request(options, (httpsRes) => {
      httpsRes.on("data", (chunk) => {
        data += chunk;
      });

      httpsRes.on("end", async () => {
        data=JSON.parse(data);
        const { results } = data;
        const response =await Data.insertMany(results);
        res.status(200).send({"message":"Data fetched from api and successfully stored into mongodb database."});
      });
    });

    req.on("error", (error) => {
      res.status(500).send(error);
    });
    req.end();
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteData = async ( req, res )=>{
  try {
    let response = await Data.collection.drop();
    res.status(200).send({"msg":"userdetails collection deleted successfully.",result:response});
  } catch (error) {
    res.status(500).send({"error":error});
  }
}

const getUsersData = async ( req, res )=>{
  const { page } = req.query;
  const limit = 10;
  let skips=( page - 1 )* limit;
  try {
    const data = await Data.find().skip(skips).limit(limit);
    res.status(200).send({data});
  } catch (error) {
    res.status(500).send({error});
  }
}

const filterUsersData = async ( req, res )=>{

}
module.exports = {getData,deleteData,getUsersData,filterUsersData};
