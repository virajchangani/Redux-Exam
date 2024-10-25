// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXkFGszUa1-otShVMkLoIPEifRCg9LOLU",
  authDomain: "final-exam-bcba7.firebaseapp.com",
  projectId: "final-exam-bcba7",
  storageBucket: "final-exam-bcba7.appspot.com",
  messagingSenderId: "780997927091",
  appId: "1:780997927091:web:9f1396ab363eeb729b10c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Firebase Auth service
const db = getFirestore(app);
const provider = new GoogleAuthProvider;

export { auth,db,provider };