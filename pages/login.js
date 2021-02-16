import React, { useState } from "react";
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
  Icon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

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

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} mt={32} maxWidth="700px" borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Formik
            onSubmit={() => {
              alert("yup");
            }}
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
          >
            <Form>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Field id="emaiL" component={Input} type="email" name="email" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Field
                    id="password"
                    component={Input}
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
                <Button type="submit" width="100%" mt={10}>
                  Log in
                </Button>
              </FormControl>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Flex>
  );
};

export default login;
