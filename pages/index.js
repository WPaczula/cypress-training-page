import {
  Box,
  Button,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import Container from "../components/Container";
import Head from "next/head";
import { useFirebaseAuth } from "../firebase/provider";
import Link from "../components/Link";

export default function Home() {
  const { signOut } = useFirebaseAuth();
  return (
    <div>
      <Head>
        <title>Your cypress training</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box width="100%" position="relative" height={16}>
        <Button
          position="absolute"
          top="2"
          right="2"
          size="xs"
          onClick={signOut}
        >
          Sign out
        </Button>
      </Box>

      <Container>
        <Heading mb={8} color="teal">
          Hej 👋
        </Heading>
        <Text>
          W tym miejscu znajdziesz linki do kolejnych ćwiczeń. Przejdź na
          konkretną stronę i przetestuj ją w cypressie korzystając z zawartych
          tam informacji.
        </Text>
        <Text mt={2}>Powodzenia 🚀</Text>
      </Container>
      <Container>
        <Heading color="teal" size="md" mb={4}>
          Przewodnik po ćwiczeniach
        </Heading>
        <OrderedList start={0}>
          <Link href="/0/move-command">
            <ListItem>Dodaj login command</ListItem>
          </Link>
          <ListItem>Pisanie testów</ListItem>
          <OrderedList>
            <Link href="/1/simple-test">
              <ListItem>Wykorzystanie podstawowych funkcji</ListItem>
            </Link>
            <Link href="/1/edit-save">
              <ListItem>Edycja danych i ich zapis</ListItem>
            </Link>
            <Link href="/1/simulating-errors">
              <ListItem>Kontrolowanie API</ListItem>
            </Link>
          </OrderedList>
          <ListItem>Debuggowanie</ListItem>
        </OrderedList>
      </Container>
    </div>
  );
}
