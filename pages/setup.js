import { Code, Heading, ListItem, OrderedList, Text } from "@chakra-ui/react";
import React from "react";
import Container from "../components/Container";
import Link from "../components/Link";
import MainPageLink from "../components/MainPageLink";

const Setup = () => {
  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">Zrób to sam 🚀</Heading>
        <Text mt={4} textAlign="justify">
          W tym momencie przejdź przez stawianie cypressa samemu.
        </Text>
        <OrderedList start={0} mt={4}>
          <ListItem>
            Potrzebujesz do tego zainstalowanego{" "}
            <Link href="https://nodejs.org/en/">node.jsa</Link>.
          </ListItem>
          <ListItem>
            Stwórz nowy folder i zainicjuj tam manager npm - <Code>npm init</Code>
          </ListItem>
          <ListItem>
            Komenda instalacji będzie się różniła od projektu - jeżeli dodajesz
            cypressa do istniejącej stronki użyj komendy{" "}
            <Code>npm i cypress --save-dev</Code>. Jeżeli będzie to twój osobny
            projekt możesz pominąć flagę <Code>--save-dev</Code>.
          </ListItem>
          <ListItem>
            Następnie odpal cypressa poprzez komendę{" "}
            <Code>npx cypress open</Code>. Zostanie stworzony dla ciebie
            podstawowy projekt z przykładami w folderze{" "}
            <Code>intergration/examples</Code>.
          </ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Text>
          Jeżeli chcesz odpalić testy bez UI, możesz wykorzystać{" "}
          <Code>npx cypress run</Code>. Testy zostaną odpalone w headless mode a
          rezultaty zostaną zwrócone w formie tekstowej (polecam na CI).
        </Text>
      </Container>
    </>
  );
};

export default Setup;
