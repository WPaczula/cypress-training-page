import {
  Button,
  CircularProgress,
  Code,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  OrderedList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import Container from "../../components/Container";
import axios from "axios";
import MainPageLink from "../../components/MainPageLink";

const SimulatingErrors = () => {
  const toast = useToast();

  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">Zmiany domenowe</Heading>
        <Text mt={8}>
          W tym ćwiczeniu postaraj się poznane metody debuggowania, żeby
          naprawić testy. W tym przypadku zmieniła się domena w stosunku do
          wcześniejszego ćwiczenia, a testy są już "zastane", napisane przez
          kolegę z zespołu. Została zaimplementowana również maksymalna kwota
          500PLN na jednego blika. Zmieniły się także nieco komunikaty dla
          użytkowników.
        </Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Test case 1
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę /2/simulating-requests</ListItem>
          <ListItem>Wypełnij kwotę</ListItem>
          <ListItem>Wypełnij numer telefonu</ListItem>
          <ListItem>Wyślij formularz przyciskiem "Prześlij blikiem"</ListItem>
          <ListItem>
            Spodziewany rezultat: Jeżeli numer telefonu istnieje i przelew
            został zrobiony (status 200) użytkownik powinien zobaczyć informację
            o treści "Kwota *KWOTA*PLN z twojego konta została poprawnie
            przelana na numer *NUMER*"
          </ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Test case 2
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę /2/simulating-requests</ListItem>
          <ListItem>Wypełnij kwotę</ListItem>
          <ListItem>Wypełnij numer telefonu</ListItem>
          <ListItem>Wyślij formularz przyciskiem "Prześlij blikiem"</ListItem>
          <ListItem>
            Spodziewany rezultat: Jeżeli numer telefonu nie istnieje (status 404
            i określone body <Code>{`{ code: "number_not_found" }`}</Code>)
            użytkownik powinien zobaczyć informację o treści "Nie udało się
            znaleźć odbiorcy o numerze telefonu *NUMER_TELEFONU*"
          </ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Test case 3
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę /1/simulating-requests</ListItem>
          <ListItem>Wypełnij kwotę</ListItem>
          <ListItem>Wypełnij numer telefonu</ListItem>
          <ListItem>Wyślij formularz przyciskiem "Prześlij blikiem"</ListItem>
          <ListItem>
            Spodziewany rezultat: Jeżeli konto nie ma wystarczających środków
            (status 403 i określone body{" "}
            <Code>{`{ code: "lack_of_funds" }`}</Code>) użytkownik powinien
            zobaczyć informację o treści "Nie udało się przesłać *KWOTA* PLN z
            uwagi na brak środków na koncie"
          </ListItem>
        </OrderedList>
      </Container>
      <Container mb={64}>
        <Formik
          initialValues={{ amount: "10", phone: "" }}
          onSubmit={({ amount, phone }, { setSubmitting }) => {
            setSubmitting(true);
            axios
              .post(
                "/api/v2/blik",
                { amount, phone },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then(() => {
                toast({
                  title: "Sukces",
                  description: `Kwota ${amount}PLN z twojego konta została poprawnie przelana na numer ${phone}`,
                  duration: 5000,
                  isClosable: true,
                  status: "success",
                });
              })
              .catch((e) => {
                if (
                  e.response.data.code === "lack_of_funds" &&
                  e.response.status === 403
                ) {
                  toast({
                    title: "Błąd",
                    description: `Nie udało się przesłać ${amount}PLN z uwagi na brak środków na koncie`,
                    duration: 5000,
                    isClosable: true,
                    status: "error",
                  });
                } else if (
                  e.response.data.code === "number_not_found" &&
                  e.response.status === 404
                ) {
                  toast({
                    title: "Błąd",
                    description: `Nie udało się znaleźć odbiorcy o numerze telefonu ${phone}`,
                    duration: 5000,
                    isClosable: true,
                    status: "error",
                  });
                }
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Field name="amount">
                {({ field, form }) => (
                  <FormControl id="amount">
                    <FormLabel>Kwota</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>PLN</InputLeftAddon>
                      <NumberInput
                        {...field}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                        min={1}
                        max={500}
                        width="100%"
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
              <Field name="phone">
                {({ field }) => (
                  <FormControl id="phone" mt="4">
                    <FormLabel>Numer telefonu odbiorcy</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>+48</InputLeftAddon>
                      <Input
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                        {...field}
                      />
                    </InputGroup>
                    <FormHelperText>Format 123-456-789</FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Button
                width="100%"
                type="submit"
                colorScheme="teal"
                disabled={!values.amount || !values.phone || isSubmitting}
                mt={4}
              >
                {isSubmitting ? <CircularProgress /> : "Prześlij blikiem"}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default SimulatingErrors;
