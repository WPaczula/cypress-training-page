import { Button } from "@chakra-ui/react";
import Head from "next/head";
import firebase from "../firebase";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello user
      <Button onClick={() => firebase.auth().signOut()}>Sign out</Button>
    </div>
  );
}
