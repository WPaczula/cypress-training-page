import {
  Button,
  Checkbox,
  Code,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import MainPageLink from "../../components/MainPageLink";
import { getRandomEmoji } from "../../utils/emoji";

const KEY = "NUMBER";

const EditSave = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [numberOfEmojis, setNumberOfEmojis] = useState(0);
  useEffect(() => {
    const currentNumber = localStorage.getItem(KEY);

    if (currentNumber === null) {
      localStorage.setItem(KEY, "5");
      setNumberOfEmojis(5);
    } else {
      setNumberOfEmojis(parseInt(currentNumber));
    }
  });

  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">Wczytywanie i edycja danych</Heading>
        <Text mt={8} textAlign="justify">
          W tym ćwiczeniu najpierw trzeba wczytać obecne dane z formularza -
          input określający liczbę emoji - zmienić jego wartość, zapisać i
          sprawdzić, czy zmiana została wprowadzona. Dzięki temu przećwiczysz
          zapisywanie danych i wywołania warunkowe.
        </Text>
        <Text mt={4} textAlign="justify">
          Do zapisu danych może przydać Ci się metoda <Code>as(NAME)</Code> aby
          stworzyć alias i <Code>get(@NAME)</Code>, bądź po prostu tworzenie
          zmiennych - wybór należy do ciebie 🤙
        </Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Test case
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę</ListItem>
          <ListItem>Wczytaj liczbę emoji</ListItem>
          <ListItem>Wejdź w tryb edycji za pomocą przycisku "Edytuj"</ListItem>
          <ListItem>Zwiększ liczbę o 1</ListItem>
          <ListItem>
            Zaznacz checkbox, który sprawdza, że nie jesteś robotem
          </ListItem>
          <ListItem>Zapisz zmiany za pomocą przycisku "Zapisz"</ListItem>
          <ListItem>
            Spodziewany rezultat: Zostaje wyświetlony o jeden więcej emoji.
          </ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Flex
          position="relative"
          justifyContent="center"
          flexDirection="column"
          minHeight={48}
        >
          {isEditMode ? (
            <Formik
              initialValues={{ numberOfEmojis, isNotARobot: false }}
              onSubmit={({ numberOfEmojis }) => {
                setNumberOfEmojis(parseInt(numberOfEmojis));
                localStorage.setItem(KEY, numberOfEmojis);
                setIsEditMode(false);
              }}
            >
              {({ values }) => (
                <Form noValidate>
                  <Field name="numberOfEmojis">
                    {({ field, form }) => (
                      <FormControl id="numberOfEmojis">
                        <FormLabel>Liczba emoji</FormLabel>
                        <NumberInput
                          {...field}
                          onChange={(val) =>
                            form.setFieldValue(field.name, val)
                          }
                          min={1}
                          max={100}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="isNotARobot">
                    {({ field }) => (
                      <FormControl id="numberOfEmojis" mt="4">
                        <FormLabel>
                          Czy na pewno nie jesteś robotem? 🤖
                        </FormLabel>
                        <Checkbox {...field} />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    width="100%"
                    type="submit"
                    disabled={!values.isNotARobot || !values.numberOfEmojis}
                    mt={4}
                  >
                    Zapisz
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <Button
                position="absolute"
                size="xs"
                top={0}
                right={0}
                onClick={() => setIsEditMode(true)}
              >
                Edytuj
              </Button>
              <Heading textAlign="center" color="teal">
                Twoje {numberOfEmojis} emoji
              </Heading>
              <Text fontSize="25px" textAlign="center" mt={4}>
                {new Array(numberOfEmojis).fill().map(getRandomEmoji).join(" ")}
              </Text>
            </>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default EditSave;
