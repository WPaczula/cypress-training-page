import React from "react";
import { Container as ChakraContainer } from "@chakra-ui/react";

const Container = (props) => {
  return (
    <ChakraContainer mt={8} shadow="md" borderRadius="base" p="8" {...props}>
      {props.children}
    </ChakraContainer>
  );
};

export default Container;
