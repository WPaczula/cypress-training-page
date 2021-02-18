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
        <Heading color="teal">Kontrolowane wybuchy 💥</Heading>
        <Text mt={8}>
          Wyobraź sobie, że twoja aplikacja korzysta z third party API na które
          nie masz wpływu lub chciałbyś sprawdzić jak się zachowa po uzyskaniu
          konkretnego statusu błędu 🤔
        </Text>
        <Text mt={4}>
          Cypress pozwala na przechwytywanie requestów przeglądarki i zwracanie
          swoich własnych odpowiedzi przy użyciu metody <Code>intercept</Code>.
          Response można zapisać jako jsony nazywane fixture. Przy okazji tego
          ćwiczenia nauczysz się jak zasymulować błąd API dla strony i jak
          wykorzystywać pliki fixture.
        </Text>
        <Text>
          Poniżej znajduje się strona, która symuluje realizację przelewu
          blikiem na dany numer telefonu. Z punktu widzenia biznesu załóżmy, że
          bardzo istotnym case'm jest sprawdzenie, że jeżeli przelew się nie
          uda, użytkownik musi zobaczyć od razu informację o niepowodzeniu.
        </Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Test case 1
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę /1/simulating-errors</ListItem>
          <ListItem>Wypełnij kwotę</ListItem>
          <ListItem>Wypełnij numer telefonu</ListItem>
          <ListItem>Wyślij formularz przyciskiem "Prześlij blikiem"</ListItem>
          <ListItem>
            Spodziewany rezultat: Jeżeli numer telefonu nie istnieje (status 404
            i określone bodyy <Code>{`{ code: "number_not_found" }`}</Code>)
            użytkownik powinien zobaczyć informację o treści "Nie udało się
            znaleźć odbiorcy o numerze telefonu *NUMER_TELEFONU*"
          </ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Test case 2
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę /1/simulating-errors</ListItem>
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
          initialValues={{ amount: 1, phone: "" }}
          onSubmit={({ amount, phone }, { setSubmitting }) => {
            setSubmitting(true);
            axios
              .post(
                "/api/blik",
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
                  description: `Kwota ${amount} PLN została poprawnie przelana na numer ${phone}`,
                  duration: 3000,
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
                    duration: 3000,
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
                    duration: 3000,
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
