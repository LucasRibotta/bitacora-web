// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAv1d2uM6WGjZ-apiWg3fNY1SMRlrsxj4",
  authDomain: "bitacora-7.firebaseapp.com",
  projectId: "bitacora-7",
  storageBucket: "bitacora-7.appspot.com",
  messagingSenderId: "904206922419",
  appId: "1:904206922419:web:b00c0cffaa322e0436f6c6",
  measurementId: "G-24XWDYC8XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);