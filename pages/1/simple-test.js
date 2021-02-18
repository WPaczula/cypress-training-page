import {
  Button,
  Code,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ListItem,
  OrderedList,
  Select,
  Text,
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
          powitaniem.
        </Text>
        <Text mt={4} textAlign="justify">
          W tym ćwiczeniu przydadzą Ci się metody <Code>get</Code>,{" "}
          <Code>select</Code>, <Code>type</Code>, <Code>click</Code> oraz
          asercje takie jak <Code>should('be.visible')</Code>
        </Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Test case
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę /1/simple-test</ListItem>
          <ListItem>Wypełnij płeć (mężczyzna)</ListItem>
          <ListItem>Wpisz imię (Jan)</ListItem>
          <ListItem>Wyślij formularz przyciskiem "Wyślij"</ListItem>
          <ListItem>
            Spodziewany rezultat: Zostaje wyświetlony toast z powitaniem: "Witaj
            Jan! Cieszę się że wysłałeś ten formularz!"
          </ListItem>
        </OrderedList>
      </Container>
      <Container mb={64}>
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
          {({ values }) => {
            return (
              <Form noValidate>
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
                <Field name="name">
                  {({ field }) => (
                    <FormControl id="name">
                      <FormLabel>Imię</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>
                <Button
                  disabled={!values.gender || !values.name}
                  width="100%"
                  mt={4}
                  type="submit"
                >
                  Wyślij 🚀
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default SimpleTest;
