import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import {
  Input,
  FormControl,
  FormLabel,
  Flex,
  Box,
  Heading,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
  CircularProgress,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "../components/Link";
import { useFirebaseAuth } from "../firebase/provider";
import { useRouter } from "next/router";

const validationSchema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .min(5, "Password needs to be at least 5 characters long")
    .max(15, "Password needs to be at most 15 characters long")
    .required("Password is required"),
});

const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const { signIn } = useFirebaseAuth();

  const handleLogin = ({ email, password }) => {
    setLoginError("");

    return signIn(email, password)
      .catch((error) => {
        setLoginError(error.message);
      })
      .then(() => router.push("/"));
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        mt={32}
        width="80%"
        maxWidth="400px"
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Formik
            onSubmit={(values, { setSubmitting, validateForm }) => {
              setSubmitted(false);

              validateForm()
                .then((errors) => {
                  if (!Object.values(errors).length) {
                    setSubmitting(true);
                    handleLogin(values).then(() => {
                      setSubmitting(false);
                    });
                  }
                })
                .then(() => {
                  setSubmitted(true);
                });
            }}
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form noValidate>
                <Field name="email">
                  {({ field, meta }) => (
                    <FormControl isInvalid={submitted && meta.error}>
                      <FormLabel>Email</FormLabel>
                      <Input id="emaiL" {...field} type="email" />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, meta }) => (
                    <FormControl mt={4} isInvalid={submitted && meta.error}>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                        />
                        <InputRightElement width="3rem">
                          <Button
                            h="1.5rem"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  colorScheme="teal"
                  type="submit"
                  width="100%"
                  mt={10}
                  disabled={isSubmitting}
                  onClick={() => setSubmitted(true)}
                >
                  {isSubmitting ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    "Log in"
                  )}
                </Button>
                {loginError && (
                  <Alert status="error" mt={4}>
                    <AlertIcon />
                    {loginError}
                  </Alert>
                )}
              </Form>
            )}
          </Formik>
          <Text mt={4} textAlign="center" width="100%" fontSize={14}>
            or <Link href="/register">register instead</Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default login;
