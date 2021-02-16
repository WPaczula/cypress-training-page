import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

const Link = (props) => {
  return (
    <NextLink href={props.href} passHref>
      <ChakraLink color="teal" {...props} />
    </NextLink>
  );
};

export default Link;
