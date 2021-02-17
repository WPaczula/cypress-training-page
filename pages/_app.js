import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import firebase from "../firebase";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      } else {
        if (router.route !== "/login" && router.route !== "/register")
          router.push("/login");
      }
    });
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
