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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

const getDescription = (t, name, gender) => {
  let description = "";
  if (name === "") {
    if (gender === "man") {
      description += t("simpleTest2.greetUnknownMan");
    } else {
      description += t("simpleTest2.greetUnknownWoman");
    }
  } else {
    description += t("simpleTest2.greetKnown", { name });
  }

  description +=
    gender === "man"
      ? t("simpleTest2.happyForManForm")
      : t("simpleTest2.happyForWomanForm");

  return description;
};

const SimpleTest = () => {
  const toast = useToast();
  const { t } = useTranslation();

  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">{t("simpleTest2.heading")}</Heading>
        <Text mt={4} textAlign="justify">
          {t("simpleTest2.p1")}
        </Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("simpleTest2.tc1.heading")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem>{t("simpleTest2.tc1.1")}</ListItem>
          <ListItem>{t("simpleTest2.tc1.2")}</ListItem>
          <ListItem>{t("simpleTest2.tc1.3")}</ListItem>
          <ListItem>{t("simpleTest2.tc1.4")}</ListItem>
          <ListItem>{t("simpleTest2.tc1.5")}</ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("simpleTest2.tc2.heading")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem>{t("simpleTest2.tc2.1")}</ListItem>
          <ListItem>{t("simpleTest2.tc2.2")}</ListItem>
          <ListItem>{t("simpleTest2.tc2.3")}</ListItem>
          <ListItem>{t("simpleTest2.tc2.4")}</ListItem>
          <ListItem>{t("simpleTest2.tc2.5")}</ListItem>
        </OrderedList>
      </Container>
      <Container mb={64}>
        <Formik
          initialValues={{ name: "", gender: "" }}
          onSubmit={({ name, gender }) => {
            toast({
              title: t("simpleTest2.hi"),
              description: getDescription(t, name, gender),
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
                      <FormLabel>{t("simpleTest2.gender")}</FormLabel>
                      <Select {...field} placeholder="-">
                        <option value="man">{t("simpleTest2.man")}</option>
                        <option value="woman">{t("simpleTest2.woman")}</option>
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <Field name="name">
                  {({ field }) => (
                    <FormControl id="name">
                      <FormLabel>{t("simpleTest2.name")}</FormLabel>
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
                  {t("simpleTest2.send")}
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
