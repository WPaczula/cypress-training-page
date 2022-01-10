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
          <Heading color="teal">Jak debugować 🪲</Heading>
          <Text mt={4} textAlign="justify">
            Strona moze wydawać ci się znajoma, jednak developer zmienił coś w kodziku
            i test niestety przestał działać. Sprwadźmy co to moze być korzystając tylko
            z myszy i konsoli przeglądarki (F12).
          </Text>
        </Container>
        <Container mt={4}>
          <Heading size="md" color="teal">
            Test case 1
          </Heading>
          <OrderedList mt={4}>
            <ListItem>Wejdź na stronę /2/simple-test</ListItem>
            <ListItem>Wypełnij płeć - mężczyzna</ListItem>
            <ListItem>Wpisz imię - Jan</ListItem>
            <ListItem>Wyślij formularz przyciskiem "Wyślij"</ListItem>
            <ListItem>
              Spodziewany rezultat: Zostaje wyświetlony komunikat z powitaniem: "Witaj
              Jan! Cieszę się, że tu jesteś!"
            </ListItem>
          </OrderedList>
        </Container>
        <Container mt={4}>
          <Heading size="md" color="teal">
            Test case 2
          </Heading>
          <OrderedList mt={4}>
            <ListItem>Wejdź na stronę /2/simple-test</ListItem>
            <ListItem>Wypełnij płeć - kobieta</ListItem>
            <ListItem>Pozostaw imię puste</ListItem>
            <ListItem>Wyślij formularz przyciskiem "Wyślij"</ListItem>
            <ListItem>
              Spodziewany rezultat: Zostaje wyświetlony komunikat z powitaniem: "Cześć
              tajemnicza nieznajoma! Cieszę się że tu jesteś!"
            </ListItem>
          </OrderedList>
        </Container>
        <Container mb={64}>
          <Formik
            initialValues={{ name: "", gender: "" }}
            onSubmit={({ name, gender }) => {
              toast({
                title: "Hej! 🙋‍♂️",
                description:
                  (name === ""
                    ? `Cześć tajemnicz${gender === "man" ? "y" : "a"} nieznajom${
                        gender === "man" ? "y" : "a"
                      }!`
                    : `Witaj ${name}!`) +
                  `${` Cieszę się, że tu jesteś!`}`,
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
                          <option value="man">M</option>
                          <option value="woman">K</option>
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
                    disabled={!values.gender}
                    width="100%"
                    mt={4}
                    colorScheme="teal"
                    type="submit"
                  >
                    Wyślij
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
  