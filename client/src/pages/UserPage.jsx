import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Select,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableRow from "../components/TableRow";
import countries from './../data/country.json';

const UserPage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  let filterKey=useRef({age:"",country:"",gender:""});
  const URL="https://cointab-server-t1qu.onrender.com/getUsersData";
  const getData = async () => {
    const filterConditions=[];
    if( filterKey.current.age !== "" ){
      filterConditions.push(`age=${filterKey.current.age}`);
    } 
    if( filterKey.current.gender !== "" ){
      filterConditions.push(`gender=${filterKey.current.gender}`);
    } 
    if( filterKey.current.country !== "" ){
      filterConditions.push(`country=${filterKey.current.country}`);
    }
    let url = URL;
    url+=`?page=${page}`;
    for(let i=0;i<filterConditions.length;i++){
      url+="&"+filterConditions[i];
    }    
    try {
      let response = await fetch(url,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      let data = await response.json();
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect=(e)=>{
    const { name, value}=e.target;
    if( name === 'age' ){
      filterKey.current["age"]=value;
    }
    if( name === 'gender' ){
      filterKey.current['gender']=value;
    }
    if( name === 'country' ){
      filterKey.current['country']=value;
    }
    filterData();
  }
  const filterData= async ()=>{
    const filterConditions=[];
    if( filterKey.current.age !== "" ){
      filterConditions.push(`age=${filterKey.current.age}`);
    } 
    if( filterKey.current.gender !== "" ){
      filterConditions.push(`gender=${filterKey.current.gender}`);
    } 
    if( filterKey.current.country !== "" ){
      filterConditions.push(`country=${filterKey.current.country}`);
    }
    try {
      let url=URL;
      url+=`?page=${page}`;
      for(let i=0;i<filterConditions.length;i++){
        url+="&"+filterConditions[i];
      }
        let response = await fetch(url,
        { method: "GET", headers: { "Content-Type": "application/json" }});
        let result = await response.json();
        setData(result.data);
    }catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, [page]);
  return (
    <Box>
      <Box display="flex" flexDir="row" w="900px" m="auto" onChange={handleSelect}>
        <Select w="200px" m="20px" name="gender">
          <option value="">Choose the gender</option>
          <option value="male">Men</option>
          <option value="female">Women</option>
        </Select>
        <Select w="200px" m="20px" name="age" onChange={handleSelect}>
          <option value="">Choose the age</option>
          <option value={25}>0-25</option>
          <option value={50}>26-50</option>
          <option value={75}>51-75</option>
          <option value={76}>Above 75</option>
        </Select>
        <Select w="200px" m="20px" name="country" onChange={handleSelect}>
          <option value="">Choose the country</option>
          {countries?.map((country)=>(
            <option key={country.name} value={country.name}>{country.name}</option>
          ))}
        </Select>
      </Box>
      <ButtonGroup float="right" marginRight="150px" marginBottom="15px">
        <Button onClick={() => setPage((prev) => prev + 1)} colorScheme="blue" isDisabled={page === 10 || data.length < 10 }>Next</Button>
        <Button onClick={() => setPage((prev) => prev - 1)} colorScheme="blue" isDisabled={page === 1}>Previous</Button>
      </ButtonGroup>
      <TableContainer
        border="1px solid black"
        w="80%"
        m="auto"
        marginTop="40px"
        borderRadius="10px"
        marginBottom="20px"
      >
        <Table variant="striped">
          <Thead fontSize="30px">
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Gender</Th>
              <Th>Age</Th>
              <Th>Email</Th>
              <Th>Country</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((user) => {
              return <TableRow key={user._id} user={user} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserPage;
