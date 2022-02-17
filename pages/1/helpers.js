import { Heading, Text } from "@chakra-ui/react";
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

const Helpers = () => {
  const { t } = useTranslation();

  return (
    <>
      <MainPageLink />
      <Container>
        <Heading color="teal">{t("helpers.heading")}</Heading>
        <Text mt={4} textAlign="justify">
          {t("helpers.p1")}
        </Text>
      </Container>
    </>
  );
};

export default Helpers;
