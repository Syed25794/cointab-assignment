const  https  = require('https');
const Data = require("../models/Data.model");

const getData = async (req, res) => {
  const isDataExists = await Data.find();
  if( isDataExists.length > 0 ){
    return res.sendStatus(304);
  }
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
        return res.status(200).send({"message":"Data fetched from api and successfully stored into mongodb database."});
      });
    });

    req.on("error", (error) => {
      return res.status(500).send(error);
    });
    req.end();
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};

const deleteData = async ( req, res ,next )=>{
  const isDataExists = await Data.find();
  if( isDataExists.length === 0 ){
    return res.sendStatus(404);
  }
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
  let skips=( Number(page) - 1 )* limit;
  try {
    const data = await Data.find().skip(skips).limit(limit);
    res.status(200).send({data});
  } catch (error) {
    res.status(500).send({error});
  }
}

const filterUsersData = async ( req, res )=>{
  const { age, gender, country } = req.query;
  const query={};
  if( age ){
    query["$and"]=[{'dob.age':{$gte:Number(age)-24}},{'dob.age':{$lte:Number(age)}}]
  }
  if( gender ){
    query["gender"]=gender;
  }
  if( country ){
    query["location.country"]=country;
  }
  const results = await Data.find(query);
  try {
    const results = await Data.find(query).catch((err) => {
      console.error(err);
    });    
    res.status(200).send(results);
  } catch (error) {
    res.status(404).send(error);
  }

}
module.exports = {getData,deleteData,getUsersData,filterUsersData};
