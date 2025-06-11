
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC80t0ATg088vwoK62QzOTA1FM5AUvcUnw",
  authDomain: "cars-cf722.firebaseapp.com",
  projectId: "cars-cf722",
  storageBucket: "cars-cf722.firebasestorage.app",
  messagingSenderId: "1076039906280",
  appId: "1:1076039906280:web:def66ba352090439fc6a5d",
  measurementId: "G-R698D3GNBH"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
