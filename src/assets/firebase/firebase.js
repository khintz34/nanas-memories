import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4pWaDXYh3FteB3hOEA3zxLDOO_TyI4ZQ",
  authDomain: "nana-s-memories.firebaseapp.com",
  projectId: "nana-s-memories",
  storageBucket: "nana-s-memories.appspot.com",
  messagingSenderId: "250149098046",
  appId: "1:250149098046:web:a4341c35e72d14adde776f",
  measurementId: "G-G4V6CYZR4G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const analytics =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;

export const db = getDatabase();

export const storage = getStorage();
