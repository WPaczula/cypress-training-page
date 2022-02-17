import React, { useEffect, useState } from "react";
import { useFirebaseAuth } from "../firebase/provider";
import { useRouter } from "next/router";
import { Flex, Spinner, usePrevious } from "@chakra-ui/react";
import { isPublic } from "../utils/public";

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
    if (localStorage.getItem("ref")) {
      setReferer(localStorage.getItem("ref"));
    }
  }, [referer]);

  const initReferer = (ref) => {
    if (!referer) {
      localStorage.setItem("ref", ref);
      setReferer(ref);
    }
  };

  useEffect(() => {
    if (user === false) {
      if (!isPublic(router.pathname)) {
        initReferer(router.pathname);
        router.push("/login");
      }
    }
  }, [user]);

  useEffect(() => {
    console.log("referer changed", referer);
    return () => {
      console.log("unmount");
    };
  }, [referer]);

  const previousUserState = usePrevious(user);
  useEffect(() => {
    if (!previousUserState && !!user && isPublic(router.pathname)) {
      if (!isPublic(referer)) {
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
    (!isPublic(router.pathname) && user === false) ||
    (isPublic(router.pathname) && user)
  ) {
    return <Loading />;
  }

  return children;
});

export default AuthGatekeeper;
