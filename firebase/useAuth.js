import { useState, useEffect } from "react";
import firebase from "./firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);

        return response.user;
      });
  };

  const signUp = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);

        return response.user;
      });
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    console.log("effect");
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.log("CHANGE");
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return unsubscribe;
  }, []);

  return {
    user,
    signIn,
    signUp,
    signOut,
  };
};

export default useAuth;
