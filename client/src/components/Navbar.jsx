import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box height={"60px"} background={"#318CE7"}>
        <Box w="50%" m="auto" display="flex" justifyContent="space-around" paddingTop="15px" fontSize="18px">
            <Box _hover={{borderBottom:"2px solid #002244"}} ><Link to="/">Home</Link></Box>
            <Box _hover={{borderBottom:"2px solid #002244"}} ><Link to="user-details">User details</Link></Box>
      </Box>
    </Box>
  );
};

export default Navbar;
