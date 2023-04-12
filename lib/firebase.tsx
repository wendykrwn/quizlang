// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.API_FIREBASE,
  authDomain: "quiz-d72f1.firebaseapp.com",
  projectId: "quiz-d72f1",
  storageBucket: "quiz-d72f1.appspot.com",
  messagingSenderId: "327968775757",
  appId: "1:327968775757:web:111fd8473156eb924f8604",
  measurementId: "G-PDWWV58QEB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);