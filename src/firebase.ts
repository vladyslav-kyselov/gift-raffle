import {getDatabase} from "firebase/database";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCalwIDYLs3e5CDOhAw4fWOJit6kJ8TqfE",
    authDomain: "gift-raffle-d89f1.firebaseapp.com",
    databaseURL: "https://gift-raffle-d89f1-default-rtdb.firebaseio.com",
    projectId: "gift-raffle-d89f1",
    storageBucket: "gift-raffle-d89f1.firebasestorage.app",
    messagingSenderId: "836780023933",
    appId: "1:836780023933:web:8154a719b82ba481db9114"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
