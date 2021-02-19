import { useState, useEffect } from "react";
import firebaseApp from "./firebase";
import firebase from "firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    return firebaseApp
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.NONE)
      .then(() =>
        firebaseApp
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            setUser(response.user);

            return response.user;
          })
      );
  };

  const signUp = (email, password) => {
    return firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);

        return response.user;
      });
  };

  const signOut = () => {
    return firebaseApp
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
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
