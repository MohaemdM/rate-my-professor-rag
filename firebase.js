import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYroZGPlXKaBuqv49wqEVA5RKiP4ROQeU",
  authDomain: "rate-my-professor-rag.firebaseapp.com",
  projectId: "rate-my-professor-rag",
  storageBucket: "rate-my-professor-rag.appspot.com",
  messagingSenderId: "932319131917",
  appId: "1:932319131917:web:ba5819ace1c0fbda251844",
  measurementId: "G-3XXC1NGK5Y"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };