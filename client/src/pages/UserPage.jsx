import React, { useEffect, useState } from "react";
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
  console.log(data);
  const getData = async () => {
    try {
      let response = await fetch(
        `http://localhost:8070/getUsersData?page=${page}`,
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
    console.log(name,value);
  }
  useEffect(() => {
    getData();
  }, [page]);
  return (
    <Box>
      <Box display="flex" flexDir="row" w="900px" m="auto" onChange={handleSelect}>
        <Select w="200px" m="20px" name="gender">
          <option value="">Choose the gender</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
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
        <Button onClick={() => setPage((prev) => prev + 1)} colorScheme="blue" isDisabled={page === 10}>Next</Button>
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
