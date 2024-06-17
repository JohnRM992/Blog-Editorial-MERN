// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "editorial-blog.firebaseapp.com",
  projectId: "editorial-blog",
  storageBucket: "editorial-blog.appspot.com",
  messagingSenderId: "273612155237",
  appId: "1:273612155237:web:3d6e54e60c7bbf006e998c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

