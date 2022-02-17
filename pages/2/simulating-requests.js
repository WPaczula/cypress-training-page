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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

const SimulatingErrors = () => {
  const toast = useToast();
  const { t } = useTranslation();

  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">{t("simulatingErrors2.heading")}</Heading>
        <Text mt={8}>{t("simulatingErrors2.p1")}</Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("simulatingErrors2.tc1.heading")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem> {t("simulatingErrors2.tc1.1")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc1.2")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc1.3")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc1.4")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc1.5")}</ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("simulatingErrors2.tc2.heading")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem> {t("simulatingErrors2.tc2.1")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc2.2")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc2.3")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc2.4")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc2.5")}</ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("simulatingErrors2.tc3.heading")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem> {t("simulatingErrors2.tc3.1")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc3.2")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc3.3")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc3.4")}</ListItem>
          <ListItem> {t("simulatingErrors2.tc3.5")}</ListItem>
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
                  title: t("simulatingErrors2.success"),
                  description: t("simulatingErrors2.successMessage", {
                    amount,
                    phone,
                  }),
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
                    title: t("simulatingErrors2.error"),
                    description: t("simulatingErrors2.errorMessage403", {
                      amount,
                    }),
                    duration: 5000,
                    isClosable: true,
                    status: "error",
                  });
                } else if (
                  e.response.data.code === "number_not_found" &&
                  e.response.status === 404
                ) {
                  toast({
                    title: t("simulatingErrors2.error"),
                    description: t("simulatingErrors2.errorMessage404", {
                      phone,
                    }),
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
                    <FormLabel>{t("simulatingErrors2.amount")}</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>
                        {t("simulatingErrors2.currency")}
                      </InputLeftAddon>
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
                    <FormLabel>
                      {t("simulatingErrors2.recipientPhoneNumber")}
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon>
                        {t("simulatingErrors.phoneCode")}
                      </InputLeftAddon>
                      <Input
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                        {...field}
                      />
                    </InputGroup>
                    <FormHelperText>
                      {t("simulatingErrors.phoneFormat")}
                    </FormHelperText>
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
                {isSubmitting ? (
                  <CircularProgress />
                ) : (
                  t("simulatingErrors.sendBLIK")
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default SimulatingErrors;
