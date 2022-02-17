import {
  Box,
  Button,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import Container from "../components/Container";
import Head from "next/head";
import { useFirebaseAuth } from "../firebase/provider";
import Link from "../components/Link";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default function Home() {
  const { signOut } = useFirebaseAuth();
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>Your cypress training</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box width="100%" position="relative" height={16}>
        <Button
          position="absolute"
          top="2"
          right="2"
          size="xs"
          onClick={signOut}
        >
          Sign out
        </Button>
      </Box>

      <Container>
        <Heading mb={8} color="teal">
          {t("index.hi")}
        </Heading>
        <Text>{t("index.p1")}</Text>
        <Text mt={2}>{t("index.p2")}</Text>
      </Container>
      <Container>
        <Heading color="teal" size="md" mb={4}>
          {t("index.p3")}
        </Heading>
        <OrderedList start={0}>
          <ListItem>
            <Link href="/0/move-command">{t("index.0")}</Link>
          </ListItem>
          <ListItem>
            <Link href="/1/helpers">{t("index.1")}</Link>
          </ListItem>
          <OrderedList>
            <ListItem>
              <Link href="/1/simple-test">{t("index.1-1")}</Link>
            </ListItem>
            <ListItem>
              <Link href="/1/edit-save">{t("index.1-2")}</Link>
            </ListItem>
            <ListItem>
              <Link href="/1/simulating-requests">{t("index.1-3")}</Link>
            </ListItem>
          </OrderedList>
          <ListItem>
            <Link href="/2/simple-test"> {t("index.2")}</Link>
            <OrderedList>
              <ListItem>
                <Link href="/2/edit-save"> {t("index.2-1")}</Link>
              </ListItem>
              <ListItem>
                <Link href="/2/simulating-requests">{t("index.2-2")}</Link>
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            <Link href="/3/files"> {t("index.3")}</Link>
          </ListItem>
        </OrderedList>
      </Container>
    </div>
  );
}
