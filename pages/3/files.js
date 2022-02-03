import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Container from "../../components/Container";
import MainPageLink from "../../components/MainPageLink";
import FileDropZone from "../../components/FileDropzone";
import Papa from "papaparse";
import Image from "next/image";

const Files = () => {
  const [users, setUsers] = useState([]);

  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">
          Działania na plikach i zewnętrzne biblioteki 🗃📂
        </Heading>
        <Text mt={8}>
          Bardzo częstym use casem w aplikacjach są wszelkie działania na
          plikach takie jak pobieranie danych ze strony w postaci plików CSV,
          pobieranie zdjęć czy wgrywanie plików na serwer.
        </Text>
        <Text mt={4}>
          Natywnie cypress nie posiada takich funkcjonalności, ale można znaleźć
          mnóstwo przydatnych bibliotek, dzięki którym testowanie takich
          funkcjonalności jest dużo prostsze. Dzisiaj skupimy się na{" "}
          <Link
            color="teal"
            backgroundColor="gray.100"
            padding="1"
            href="https://www.npmjs.com/package/cypress-file-upload"
          >
            cypress-file-upload
          </Link>
          oraz wykorzystamy parser plików CSV aby sprawdzić czy pobrany plik ma
          odpowiednie dane{" "}
          <Link
            color="teal"
            padding="1"
            backgroundColor="gray.100"
            href="https://www.npmjs.com/package/papaparse"
          >
            papaparse
          </Link>
          .
        </Text>
        <Text mt={4}>
          Poniżej znajduje się przycisk, który pozwala na ściągnięcie obrazka
          oraz miejsce, w które można "wrzucić" plik, który jest później
          wyświetlony. Kieruj się poleceniami aby wykonać ćwiczenia z tego
          bloku.
        </Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Ściąganie pliku
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę /1/files</ListItem>
          <ListItem>
            Śgiągnij obrazek poprzez kliknięcie w przycisk "Pobierz"
          </ListItem>
          <ListItem>
            Spodziewany rezultat: obrazek został ściągnięty i nazywa się
            "cypress.jpg"
          </ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Flex
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box borderColor="teal" borderWidth="10px" height="220px">
            <Image src="/cypress.jpg" height="200" width="300" />
          </Box>
          <Button as="a" colorScheme="teal" mt="4" download href="/cypress.jpg">
            Pobierz
          </Button>
        </Flex>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Upload pliku
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę /1/files</ListItem>
          <ListItem>
            Wrzuć plik "users.csv" (folder fixtures) poprzez drag-n-drop
          </ListItem>
          <ListItem>Kliknij przycisk "Podgląd"</ListItem>
          <ListItem>
            Spodziewany rezultat: użytkownicy z pliku CSV pokazują się pod
            przyciskiem w tabelce
          </ListItem>
        </OrderedList>
      </Container>
      <Container>
        <Formik
          initialValues={{ file: null }}
          onSubmit={({ file }, { setSubmitting }) => {
            setSubmitting(true);
            Papa.parse(file, {
              complete: ({ data }) => {
                setUsers(data);
                setSubmitting(false);
              },
              header: true,
            });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Field name="file">
                {({ field, form }) => (
                  <FormControl id="file" mt="4">
                    <FormLabel>Użytkownicy</FormLabel>
                    <FileDropZone
                      {...field}
                      instruction="Wybierz plik csv"
                      id="file"
                      disabled={form.isSubmitting}
                      onChange={(val) => {
                        if (!val) {
                          setUsers([]);
                        }
                        form.setFieldValue(field.name, val);
                      }}
                    />
                  </FormControl>
                )}
              </Field>
              <Button
                width="100%"
                type="submit"
                colorScheme="teal"
                disabled={!values.file || isSubmitting}
                mt={4}
              >
                {isSubmitting ? <CircularProgress /> : "Podgląd"}
              </Button>
            </Form>
          )}
        </Formik>
        {users.length > 0 && (
          <Table mt="8">
            <Thead backgroundColor="gray.100">
              <Tr>
                <Td>Id</Td>
                <Td>First name</Td>
                <Td>Last name</Td>
                <Td>Email</Td>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.firstname}</Td>
                  <Td>{user.lastname}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default Files;
