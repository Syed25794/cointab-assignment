import { Button } from "@chakra-ui/react";

const ButtonComponent = ({ name, handleClick }) => {
  return (
    <Button
      variant="solid"
      colorScheme="blue"
      m="25px"
      border="1px solid white"
      fontSize="15px"
      p="10px 20px"
      _hover={{
        background: "white",
        color: "black",
        border: "1px solid black",
        boxShadow:
          " 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)",
      }}
      name={name}
      onClick={handleClick}
    >
      {name}
    </Button>
  );
};

export default ButtonComponent;
