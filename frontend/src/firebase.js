// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "samaybiharnews.firebaseapp.com",
  projectId: "samaybiharnews",
  storageBucket: "samaybiharnews.firebasestorage.app",
  messagingSenderId: "63629857121",
  appId: "1:63629857121:web:31a4f1c1faaad50afaf520",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
