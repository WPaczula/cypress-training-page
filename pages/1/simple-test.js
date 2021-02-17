import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ListItem,
  OrderedList,
  Select,
  Text,
  toast,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import Container from "../../components/Container";
import MainPageLink from "../../components/MainPageLink";

const SimpleTest = () => {
  const toast = useToast();

  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">Podstawowy test 👶</Heading>
        <Text mt={8} textAlign="justify">
          Poniżej znajduje się formularz, w którym należy wybrać płeć oraz imię.
          Po przyciśnięciu przycisku submit zostanie wyświetlony toast z
          powitaniem
        </Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Test case to:
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę</ListItem>
          <ListItem>Wypełnij płeć (mężczyzna)</ListItem>
          <ListItem>Wpisz imię (Jan)</ListItem>
          <ListItem>Wyślij formularz przyciskiem "Wyślij"</ListItem>
          <ListItem>
            Spodziewany rezultat: Zostaje wyświetlony toast z powitaniem: "Witaj
            *IMIĘ*! Cieszę się że wysłałeś ten formularz!"
          </ListItem>
        </OrderedList>
      </Container>
      <Container>
        <Formik
          initialValues={{ name: "", gender: "" }}
          onSubmit={({ name, gender }) => {
            toast({
              title: "Hej! 🙋‍♂️",
              description: `Witaj ${name}! ${
                gender !== "other"
                  ? `Cieszę się że wysłał${
                      gender === "man" ? "eś" : "aś"
                    } ten formularz!`
                  : "Cieszę się że formularz został wysłany!"
              }`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }}
        >
          <Form noValidate>
            <Field name="name">
              {({ field }) => (
                <FormControl id="name">
                  <FormLabel>Imię</FormLabel>
                  <Input {...field} />
                </FormControl>
              )}
            </Field>
            <Field name="gender">
              {({ field }) => (
                <FormControl id="gender" mt={4}>
                  <FormLabel>Płeć</FormLabel>
                  <Select {...field} placeholder="-">
                    <option value="man">Mężczyzna</option>
                    <option value="woman">Kobieta</option>
                    <option value="other">Inny</option>
                  </Select>
                </FormControl>
              )}
            </Field>
            <Button width="100%" mt={4} type="submit">
              Wyślij 🚀
            </Button>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default SimpleTest;
