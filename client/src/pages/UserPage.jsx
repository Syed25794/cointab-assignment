import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableRow from "../components/TableRow";

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
  useEffect(() => {
    getData();
  }, [page]);
  return (
    <Box>
      <Button onClick={() => setPage((prev) => prev + 1)} isDisabled={ page === 10 }>Next</Button>
      <Button onClick={() => setPage((prev) => prev - 1)} isDisabled={ page === 1 }>Previous</Button>
      <TableContainer
        border="1px solid black"
        w="80%"
        m="auto"
        marginTop="40px"
        borderRadius="10px"
        marginBottom="20px"
      >
        <Table variant="striped" >
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
            {data?.map((user) =>{
              return <TableRow key={user._id} user={user} />
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserPage;
