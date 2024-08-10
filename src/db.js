// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Ensure this line is included

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP2iK1n3JgoimZJEe60xXXcdc5HqhTCdQ",
  authDomain: "contact-book-8a6b7.firebaseapp.com",
  projectId: "contact-book-8a6b7",
  storageBucket: "contact-book-8a6b7.appspot.com",
  messagingSenderId: "285743380890",
  appId: "1:285743380890:web:14b7683594ee6cf3642223",
  measurementId: "G-FSBR8TSYQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);  // This will work now

export default db;  // Exporting db as the default export
