import React, { useEffect, useState } from "react";
import { useFirebaseAuth } from "../firebase/provider";
import { useRouter } from "next/router";
import { Flex, Spinner, usePrevious } from "@chakra-ui/react";

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
  const [referer, setReferer] = useState();

  useEffect(() => {
    if (user === false) {
      if (router.pathname !== "/login" || router.pathname !== "/register") {
        setReferer(router.pathname);
        router.push("/login");
      }
    }
  }, [user]);

  const previousUserState = usePrevious(user);
  useEffect(() => {
    if (!previousUserState && !!user && router.pathname === "/login") {
      if (referer !== "/login") {
        router.push(referer || "/");
      } else {
        router.push("/");
      }
    }
  }, [user, previousUserState]);

  if (user === null) {
    return <Loading />;
  }

  if (
    (router.pathname !== "/login" &&
      router.pathname !== "/register" &&
      user === false) ||
    (router.pathname === "/login" && user)
  ) {
    return <Loading />;
  }

  return children;
});

export default AuthGatekeeper;
