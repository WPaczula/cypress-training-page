import { Box, Button } from "@chakra-ui/react";
import React from "react";
import Link from "./Link";

const MainPageLink = () => {
  return (
    <>
      <Box height="4" />
      <Link href="/" position="fixed" top={2} left={2}>
        <Button
          size="small"
          colorScheme="teal"
          p="1"
          width={7}
          color="white"
          fontWeight="bold"
        >
          {"<"}
        </Button>
      </Link>
    </>
  );
};

export default MainPageLink;
