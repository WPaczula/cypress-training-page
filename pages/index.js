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
        <OrderedList>
          <ListItem>Podstawowe funkcje w cypressie</ListItem>
          <ListItem>Debugowanie testu</ListItem>
          <ListItem>Podstawowe funkcje w cypressie</ListItem>
        </OrderedList>
      </Container>
    </div>
  );
}
