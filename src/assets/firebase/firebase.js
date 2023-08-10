import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

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
