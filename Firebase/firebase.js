// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBc3eT-_mNhduFfhIQ9v9m5Vha5Qp3gJ9U",
  authDomain: "shoppingapp-5e4b4.firebaseapp.com",
  projectId: "shoppingapp-5e4b4",
  storageBucket: "shoppingapp-5e4b4.appspot.com",
  messagingSenderId: "456570904803",
  appId: "1:456570904803:web:eca1879e720d20a253e5d6",
  measurementId: "G-KZJLSWEDVE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(FirebaseApp);
export const Firestore = getFirestore(FirebaseApp);
export const Storage = getStorage(FirebaseApp);
