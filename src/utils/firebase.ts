// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPjWdoa0qT7G9H6wXaRH_8Ch4QOUVcfvA",
  authDomain: "final-exam-13a7f.firebaseapp.com",
  projectId: "final-exam-13a7f",
  storageBucket: "final-exam-13a7f.appspot.com",
  messagingSenderId: "637437947710",
  appId: "1:637437947710:web:65ba72f88602ed5ed2c66f",
  measurementId: "G-HSXTCPN1BP"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);