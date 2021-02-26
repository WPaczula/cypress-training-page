import { Code, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Container from "../../components/Container";
import MainPageLink from "../../components/MainPageLink";

const MoveCommand = () => {
  return (
    <Container>
      <MainPageLink />
      <Heading color="teal">0. Dodaj login command 📦</Heading>
      <Text mt={8} textAlign="justify">
        Tworzenie reużywalnych komend w cypressie to dobry sposób na{" "}
        <strong>uniknięcie duplikacji</strong> kodu! Zamiast tego można także
        wydzielić funkcję javascriptową i tam włożyć swoją logikę, co wolisz 😄
      </Text>
      <Text textAlign="justify" mt={4}>
        Jak ocenić czy tworzyć funkcję czy dodać command? Dla mnie sprawdzało
        się pytanie:{" "}
        <i>
          "Czy ta funkcja będzie rozszerzać możliwości cypressa czy będzie
          zawierać moją logikę biznesową?"
        </i>{" "}
        Pierwszy przypadek to obsługa customowych kontrolek w projekcie, drugą
        byłoby wypełnienie formularza w określony sposób lub zaciągnięcie
        danych.
      </Text>
      <Text mt={4} textAlign="justify">
        Do dzieła! 🚀 Stwórz nową komendę cypressa, która pozwoli zalogować
        użytkownika. Będziemy jej potrzebować w każdym teście na stronach za
        autentykacją. Poniżej znajdziesz templatkę:
      </Text>
      <Code width="100%" mt={4}>
        <Text>{`Cypress.Commands.add('COMMAND_NAME', (...ARGUMENTS) => {`}</Text>
        <Text>&emsp;{`// BODY OF THE COMMAND`}</Text>
        <Text>{`})`}</Text>
      </Code>
    </Container>
  );
};

export default MoveCommand;
