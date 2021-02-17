import React, { useEffect } from "react";
import { useFirebaseAuth } from "../firebase/provider";
import { useRouter } from "next/router";
import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => (
  <Flex
    flex="1"
    height="100vh"
    width="100vw"
    justifyContent="center"
    alignItems="center"
  >
    <Spinner
      thickness="4px"
      speed="0.5s"
      emptyColor="gray.200"
      color="teal"
      size="xl"
    />
  </Flex>
);

const AuthGatekeeper = React.memo(({ children }) => {
  const router = useRouter();
  const { user } = useFirebaseAuth();

  useEffect(() => {
    if (user === false) {
      if (router.pathname !== "/login" || router.pathname !== "/register") {
        router.push("/login");
      }
    }
  }, [user]);

  if (user === null) {
    return <Loading />;
  }

  if (
    router.pathname !== "/login" &&
    router.pathname !== "/register" &&
    user === false
  ) {
    return <Loading />;
  }

  return children;
});

export default AuthGatekeeper;
