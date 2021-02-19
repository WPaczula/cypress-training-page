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
          Edycja danych jest bardzo częstą sytuacją w aplikacjach, zarówno tych
          prostych jak i bardziej skomplikowanych. Aby sprawdzić, czy zmiany
          zostały wprowadzone często trzeba porównać je ze stanem informacji
          sprzed zapisu.
        </Text>
        <Text mt={8} textAlign="justify">
          W tym ćwiczeniu zobaczysz jak wczytać obecne dane z formularza,
          zmienić wartości i sprawdzić czy twoje zmiany zostały wprowadzone.
          Dzięki temu przećwiczysz przechowywanie informacji pomiędzy kolejnymi
          krokami.
        </Text>
        <Text mt={4} textAlign="justify">
          Do zapisu danych może przydać Ci się metoda <Code>as(NAME)</Code> aby
          stworzyć alias i <Code>get(@NAME)</Code>, bądź po prostu tworzenie
          zmiennych - wybór należy do ciebie 🤙
        </Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          Test case 1
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę /1/edit-save</ListItem>
          <ListItem>Wczytaj liczbę emoji</ListItem>
          <ListItem>Wejdź w tryb edycji za pomocą przycisku "Edytuj"</ListItem>
          <ListItem>Zwiększ liczbę o 1 za pomocą strzałki w górę</ListItem>
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
        <Heading size="md" color="teal">
          Test case 2
        </Heading>
        <OrderedList mt={4}>
          <ListItem>Wejdź na stronę /1/edit-save</ListItem>
          <ListItem>Wczytaj liczbę emoji</ListItem>
          <ListItem>Wejdź w tryb edycji za pomocą przycisku "Edytuj"</ListItem>
          <ListItem>Wyczyść input "Liczba emoji"</ListItem>
          <ListItem>Odrzuć zmiany za pomocą przycisku "Anuluj"</ListItem>
          <ListItem>
            Spodziewany rezultat: Liczba emoji pozostaje bez zmian.
          </ListItem>
        </OrderedList>
      </Container>
      <Container mt={4} mb={64}>
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
                  <Flex direction="row" mt={4} width="100%">
                    <Button
                      flex={1}
                      mr={2}
                      type="submit"
                      colorScheme="teal"
                      disabled={!values.isNotARobot || !values.numberOfEmojis}
                    >
                      Zapisz
                    </Button>
                    <Button
                      ml={2}
                      flex={1}
                      onClick={() => setIsEditMode(false)}
                    >
                      Anuluj
                    </Button>
                  </Flex>
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
