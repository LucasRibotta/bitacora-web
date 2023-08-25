import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBAv1d2uM6WGjZ-apiWg3fNY1SMRlrsxj4",
  authDomain: "bitacora-7.firebaseapp.com",
  projectId: "bitacora-7",
  storageBucket: "bitacora-7.appspot.com",
  messagingSenderId: "904206922419",
  appId: "1:904206922419:web:b00c0cffaa322e0436f6c6",
  measurementId: "G-24XWDYC8XV"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth()