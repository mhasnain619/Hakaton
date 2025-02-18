// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyA6tnKcqElP0_VxsY98B3e2F0CbDRenQrM",
    authDomain: "finalhackaton-f47c3.firebaseapp.com",
    projectId: "finalhackaton-f47c3",
    storageBucket: "finalhackaton-f47c3.firebasestorage.app",
    messagingSenderId: "614797269281",
    appId: "1:614797269281:web:4750023526ae245981c660",
    measurementId: "G-160R2FFR4V"
};

// Initialize Firebase
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db }