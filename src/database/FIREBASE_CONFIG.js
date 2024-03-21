// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getFireStore } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyADfKD_-2LTfM3cR3Gkp1D8xy2Lvowut4c",
    authDomain: "diamond-dashboard-fe151.firebaseapp.com",
    databaseURL: "https://diamond-dashboard-fe151-default-rtdb.firebaseio.com",
    projectId: "diamond-dashboard-fe151",
    storageBucket: "diamond-dashboard-fe151.appspot.com",
    messagingSenderId: "438865216633",
    appId: "1:438865216633:web:6ee00b49e5bb07773c00a8",
    measurementId: "G-1ZL7RMD1MX"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);

// Firestore database
// export const fireStore = getFireStore(firebaseApp);

// Realtime database 
export const database = getDatabase(firebaseApp);