// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_UnzRAmIlG6yLW1IodOr2fzuCyA6prKE",
  authDomain: "natta-sign-up.firebaseapp.com",
  projectId: "natta-sign-up",
  storageBucket: "natta-sign-up.appspot.com",
  messagingSenderId: "822721323910",
  appId: "1:822721323910:web:c678b75f43ff39c74c8207",
  measurementId: "G-XB5THY0KVD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
