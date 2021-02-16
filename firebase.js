import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAAYL0zWv6c1IwP8Y38LoZbe7CyddUXz14",
  authDomain: "cypress-page-e8d63.firebaseapp.com",
  projectId: "cypress-page-e8d63",
  storageBucket: "cypress-page-e8d63.appspot.com",
  messagingSenderId: "121810244084",
  appId: "1:121810244084:web:52a7e1f87c8207a39ba9a1",
};

export default firebase.initializeApp(firebaseConfig);
