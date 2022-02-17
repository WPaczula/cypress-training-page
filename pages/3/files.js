import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Container from "../../components/Container";
import MainPageLink from "../../components/MainPageLink";
import FileDropZone from "../../components/FileDropzone";
import Papa from "papaparse";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

const Files = () => {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">{t("files.heading")}</Heading>
        <Text mt={8}>{t("files.p1")}</Text>
        <Text mt={4}>
          {t("files.p2")}
          <Link
            color="teal"
            backgroundColor="gray.100"
            padding="1"
            href="https://www.npmjs.com/package/cypress-file-upload"
          >
            cypress-file-upload
          </Link>
          {t("files.p3")}
          <Link
            color="teal"
            padding="1"
            backgroundColor="gray.100"
            href="https://www.npmjs.com/package/papaparse"
          >
            papaparse
          </Link>
          .
        </Text>
        <Text mt={4}>{t("files.p4")}</Text>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("files.tc1.heading")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem>{t("files.tc1.1")}</ListItem>
          <ListItem>{t("files.tc1.2")}</ListItem>
          <ListItem>{t("files.tc1.3")}</ListItem>
        </OrderedList>
      </Container>
      <Container mt={4}>
        <Flex
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Box borderColor="teal" borderWidth="10px" height="220px">
            <Image src="/cypress.jpg" height="200" width="300" />
          </Box>
          <Button as="a" colorScheme="teal" mt="4" download href="/cypress.jpg">
            {t("files.download")}
          </Button>
        </Flex>
      </Container>
      <Container mt={4}>
        <Heading size="md" color="teal">
          {t("files.tc2.heading")}
        </Heading>
        <OrderedList mt={4}>
          <ListItem>{t("files.tc2.1")}</ListItem>
          <ListItem>{t("files.tc2.2")}</ListItem>
          <ListItem>{t("files.tc2.3")}</ListItem>
        </OrderedList>
      </Container>
      <Container>
        <Formik
          initialValues={{ file: null }}
          onSubmit={({ file }, { setSubmitting }) => {
            setSubmitting(true);
            Papa.parse(file, {
              complete: ({ data }) => {
                setUsers(data);
                setSubmitting(false);
              },
              header: true,
            });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Field name="file">
                {({ field, form }) => (
                  <FormControl id="file" mt="4">
                    <FormLabel>{t("files.users")}</FormLabel>
                    <FileDropZone
                      {...field}
                      instruction={t("files.chooseCSV")}
                      id="file"
                      disabled={form.isSubmitting}
                      onChange={(val) => {
                        if (!val) {
                          setUsers([]);
                        }
                        form.setFieldValue(field.name, val);
                      }}
                    />
                  </FormControl>
                )}
              </Field>
              <Button
                width="100%"
                type="submit"
                colorScheme="teal"
                disabled={!values.file || isSubmitting}
                mt={4}
              >
                {isSubmitting ? <CircularProgress /> : t("files.preview")}
              </Button>
            </Form>
          )}
        </Formik>
        {users.length > 0 && (
          <Table mt="8">
            <Thead backgroundColor="gray.100">
              <Tr>
                <Td>Id</Td>
                <Td>First name</Td>
                <Td>Last name</Td>
                <Td>Email</Td>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.firstname}</Td>
                  <Td>{user.lastname}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default Files;
