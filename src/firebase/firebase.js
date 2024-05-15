import { initializeApp } from 'firebase/app';

import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMSr60sUBMeE8xeZaHPv2u61h8eHi_OkU",
    authDomain: "privs7.firebaseapp.com",
    databaseURL: "https://privs7-default-rtdb.firebaseio.com",
    projectId: "privs7",
    storageBucket: "privs7.appspot.com",
    messagingSenderId: "327588962574",
    appId: "1:327588962574:web:dfa8bc0530ada53a39375f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()

