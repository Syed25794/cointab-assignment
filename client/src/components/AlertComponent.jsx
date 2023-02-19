import { Alert, AlertIcon } from "@chakra-ui/react";

const AlertComponent = ({ message, status }) => {
  return (
    <Alert w="full" status={status} marginTop="5px">
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default AlertComponent;
