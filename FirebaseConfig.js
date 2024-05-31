import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYZPCnHBMFwyViwTQQ_MbwBDq3ZuDyi24",
  authDomain: "assignmentdanentang.firebaseapp.com",
  databaseURL: "https://assignmentdanentang-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "assignmentdanentang",
  storageBucket: "assignmentdanentang.appspot.com",
  messagingSenderId: "515834641326",
  appId: "1:515834641326:web:1db06bf3ad242baf25663f",
  measurementId: "G-3M3J0QYXYP"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const DATABASE = getDatabase();
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

