// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWNL7waPOCH44oLMT-mroST83HT0-chP0",
  authDomain: "nextapp-b207a.firebaseapp.com",
  projectId: "nextapp-b207a",
  storageBucket: "nextapp-b207a.appspot.com",
  messagingSenderId: "1034426016377",
  appId: "1:1034426016377:web:090ef86a32a379c6eeaaa8",
  measurementId: "G-C499H2CT9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = new getFirestore(app);
export { db };
