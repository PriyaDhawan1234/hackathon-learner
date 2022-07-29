// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZGvT0X4sB-5F9XX3URuVRHET-3QUb0pQ",
  authDomain: "hackathon-carplay.firebaseapp.com",
  projectId: "hackathon-carplay",
  storageBucket: "hackathon-carplay.appspot.com",
  messagingSenderId: "853284928396",
  appId: "1:853284928396:web:9e999480ee1fcd49e974a9",
  measurementId: "G-7D9RE0RTPZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
