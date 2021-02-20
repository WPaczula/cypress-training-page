import { Code, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Container from "../../components/Container";
import MainPageLink from "../../components/MainPageLink";

const Helpers = () => {
  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">Spis użytecznych komend</Heading>
        <Text mt={4} textAlign="justify">
          Jeżeli będziesz chciał sobie przypomnieć komendy lub sposób pisania
          asercji/budowę testu odwiedź folder <Code>code</Code> w tej solucji.
          Jeżeli czegoś w nim nie znajdziesz powiedz mi a ja postaram ci się
          pomóc i dodać to od razu dla potomnych 😄
        </Text>
      </Container>
    </>
  );
};

export default Helpers;
