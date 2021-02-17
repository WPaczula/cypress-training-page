import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import AuthProvider from "../firebase/provider";
import AuthGatekeeper from "../components/AuthGatekeeper";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <AuthGatekeeper>
          <Component {...pageProps} />
        </AuthGatekeeper>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
