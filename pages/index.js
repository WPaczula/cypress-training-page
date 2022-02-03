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
          <ListItem>
            <Link href="/0/move-command">Dodaj login command</Link>
          </ListItem>
          <ListItem>
            <Link href="/1/helpers">Pisanie testów</Link>
          </ListItem>
          <OrderedList>
            <ListItem>
              <Link href="/1/simple-test">
                Wykorzystanie podstawowych funkcji
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/1/edit-save">Edycja danych i ich zapis</Link>
            </ListItem>
            <ListItem>
              <Link href="/1/simulating-requests">Kontrolowanie API</Link>
            </ListItem>
          </OrderedList>
          <ListItem>
            <Link href="/2/simple-test">Zmiany w testach</Link>
            <OrderedList>
              <ListItem>
                <Link href="/2/edit-save">Ćwiczenia w debugowaniu</Link>
              </ListItem>
              <ListItem>
                <Link href="/2/simulating-requests">
                  Ćwiczenia w naprawianiu zmian domenowych
                </Link>
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            <Link href="/3/files">Zewnętrzne biblioteki i pliki</Link>
          </ListItem>
        </OrderedList>
      </Container>
    </div>
  );
}
