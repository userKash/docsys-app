// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAcynQq8I5P6p2aJLbMlNIclFtoAPe1atk",
    authDomain: "docsys-20d71.firebaseapp.com",
    projectId: "docsys-20d71",
    storageBucket: "docsys-20d71.firebasestorage.app",
    messagingSenderId: "124546840059",
    appId: "1:124546840059:web:1e36c0551000eb5033075e"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
