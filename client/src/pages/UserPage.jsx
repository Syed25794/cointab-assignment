import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

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
        <Table variant="striped" colorScheme="teal">
          <Thead>
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
            {data?.map((user) => (
              <Tr key={user._id}>
                <Td>
                  <Image src={user.picture.medium} alt={user.name.first} />
                </Td>
                <Td>{`${user.name.first} ${user.name.last}`}</Td>
                <Td>{user.gender}</Td>
                <Td>{user.dob.age}</Td>
                <Td>{user.email}</Td>
                <Td>{user.location.country}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserPage;
