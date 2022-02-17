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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

const KEY = "NUMBER";

const EditSave = () => {
  const { t } = useTranslation();
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
        <Heading color="teal">{t("editSave.heading")}</Heading>
        <Text mt={8} textAlign="justify">
          {t("editSave.p1")}
        </Text>
        <Text mt={8} textAlign="justify">
          {t("editSave.p2")}
        </Text>
        <Text mt={4} textAlign="justify">
          {t("editSave.p3")}
        </Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("editSave.tc1.title")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem> {t("editSave.tc1.1")}</ListItem>
          <ListItem> {t("editSave.tc1.2")}</ListItem>
          <ListItem> {t("editSave.tc1.3")}</ListItem>
          <ListItem> {t("editSave.tc1.4")}</ListItem>
          <ListItem> {t("editSave.tc1.5")}</ListItem>
          <ListItem> {t("editSave.tc1.6")}</ListItem>
          <ListItem> {t("editSave.tc1.7")}</ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("editSave.tc2.title")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem> {t("editSave.tc2.1")}</ListItem>
          <ListItem> {t("editSave.tc2.2")}</ListItem>
          <ListItem> {t("editSave.tc2.3")}</ListItem>
          <ListItem> {t("editSave.tc2.4")}</ListItem>
          <ListItem> {t("editSave.tc2.5")}</ListItem>
          <ListItem> {t("editSave.tc2.6")}</ListItem>
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
                        <FormLabel>{t("editSave.emojiCount")}</FormLabel>
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
                        <FormLabel>{t("editSave.robot")}</FormLabel>
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
                      {t("1.save")}
                    </Button>
                    <Button
                      ml={2}
                      flex={1}
                      onClick={() => setIsEditMode(false)}
                    >
                      {t("editSave.cancel")}
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
                {t("editSave.edit")}
              </Button>
              <Heading textAlign="center" color="teal">
                {t("editSave.yourEmoji")}
              </Heading>
              <Text fontSize="25px" textAlign="center" mt={4}>
                {new Array(numberOfEmojis)
                  .fill()
                  .map(getRandomEmoji)
                  .map((e) => (
                    <span key={e}>{e}</span>
                  ))}
              </Text>
            </>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default EditSave;
