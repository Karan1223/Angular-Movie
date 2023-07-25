import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyClU4mmbv5d5EbRzLlyTVPlnv4xn-l3riI",
  authDomain: "react-netflix-clone-cd267.firebaseapp.com",
  projectId: "react-netflix-clone-cd267",
  storageBucket: "react-netflix-clone-cd267.appspot.com",
  messagingSenderId: "345728494699",
  appId: "1:345728494699:web:ac15ebd1b8c017a4b7d52e",
  measurementId: "G-DQG9LBYF85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);