import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBon7H-p3os2qhC5ZKXG2trslO9Qn_JzM",
  authDomain: "intelicode-86352.firebaseapp.com",
  projectId: "intelicode-86352",
  storageBucket: "intelicode-86352.appspot.com",
  messagingSenderId: "1031887744051",
  appId: "1:1031887744051:web:31603ec3c825c31bb70746",
  measurementId: "G-LGNYPBNRCR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export let auth = getAuth(app);
export const provider = new GoogleAuthProvider();
