import { Code, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "next-i18next";
import Container from "../../components/Container";
import MainPageLink from "../../components/MainPageLink";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

const MoveCommand = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <MainPageLink />
      <Heading color="teal">{t("moveCommand.heading")}</Heading>
      <Text mt={8} textAlign="justify">
        {t("moveCommand.p1")}
      </Text>
      <Text textAlign="justify" mt={4}>
        {t("moveCommand.p2")} <i>{t("moveCommand.p3")}</i> {t("moveCommand.p4")}
      </Text>
      <Text mt={4} textAlign="justify">
        {t("moveCommand.p5")} <Code>/support/commands.js</Code>:
      </Text>
      <Code width="100%" mt={4}>
        <Text>{`Cypress.Commands.add('COMMAND_NAME', (...ARGUMENTS) => {`}</Text>
        <Text>&emsp;{`// BODY OF THE COMMAND`}</Text>
        <Text>{`})`}</Text>
      </Code>
      <Text mt={4} textAlign="justify">
        {t("moveCommand.p6")}
      </Text>
    </Container>
  );
};

export default MoveCommand;
