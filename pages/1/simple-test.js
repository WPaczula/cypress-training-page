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
      description += t("simpleTest.greetUnknownMan");
    } else {
      description += t("simpleTest.greetUnknownWoman");
    }
  } else {
    description += t("simpleTest.greetKnown", { name });
  }

  description +=
    gender === "man"
      ? t("simpleTest.happyForManForm")
      : t("simpleTest.happyForWomanForm");

  return description;
};

const SimpleTest = () => {
  const toast = useToast();
  const { t } = useTranslation();

  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">{t("simpleTest.heading")}</Heading>
        <Text mt={4} textAlign="justify">
          {t("simpleTest.p1")}
        </Text>
        <Text mt={4} textAlign="justify">
          {t("simpleTest.p2")}
          <Code>get</Code>, <Code>select</Code>, <Code>type</Code>,{" "}
          <Code>click</Code>
          {t("simpleTest.p3")}
          <Code>should('be.visible')</Code>
        </Text>
        <Text mt={8} textAlign="justify">
          {t("simpleTest.p4")}
        </Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("simpleTest.tc1.heading")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem>{t("simpleTest.tc1.1")}</ListItem>
          <ListItem>{t("simpleTest.tc1.2")}</ListItem>
          <ListItem>{t("simpleTest.tc1.3")}</ListItem>
          <ListItem>{t("simpleTest.tc1.4")}</ListItem>
          <ListItem>{t("simpleTest.tc1.5")}</ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("simpleTest.tc2.heading")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem>{t("simpleTest.tc2.1")}</ListItem>
          <ListItem>{t("simpleTest.tc2.2")}</ListItem>
          <ListItem>{t("simpleTest.tc2.3")}</ListItem>
          <ListItem>{t("simpleTest.tc2.4")}</ListItem>
          <ListItem>{t("simpleTest.tc2.5")}</ListItem>
        </OrderedList>
      </Container>
      <Container mb={64}>
        <Formik
          initialValues={{ name: "", gender: "" }}
          onSubmit={({ name, gender }) => {
            toast({
              title: t("simpleTest.hi"),
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
                      <FormLabel>{t("simpleTest.gender")}</FormLabel>
                      <Select {...field} placeholder="-">
                        <option value="man">{t("simpleTest.man")}</option>
                        <option value="woman">{t("simpleTest.woman")}</option>
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <Field name="name">
                  {({ field }) => (
                    <FormControl id="name">
                      <FormLabel>{t("simpleTest.name")}</FormLabel>
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
                  {t("simpleTest.send")}
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
