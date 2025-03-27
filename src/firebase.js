// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDOzCnkONFAkP80317uj3BXwmMmC1ptW_I",
    authDomain: "trailpin-fbdc7.firebaseapp.com",
    projectId: "trailpin-fbdc7",
    storageBucket: "trailpin-fbdc7.firebasestorage.app",
    messagingSenderId: "1009224104237",
    appId: "1:1009224104237:web:04d3c34dbd51ae2c9a3ba4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);