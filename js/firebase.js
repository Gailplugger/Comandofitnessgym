import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
  writeBatch
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_up8m1tKd0V-3S_axtf7h_iQDmpoKOfs",
  authDomain: "commando-fitness-gym.firebaseapp.com",
  projectId: "commando-fitness-gym",
  storageBucket: "commando-fitness-gym.firebasestorage.app",
  messagingSenderId: "911802558165",
  appId: "1:911802558165:web:e15d9a1ad9a4adf74aa45c"
};

export const ADMIN_EMAIL = "kartikgoyalrajgarh@gmail.com";
export const auth = getAuth(initializeApp(firebaseConfig));
export const db = getFirestore();
export const firestore = {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch
};
export const authentication = { onAuthStateChanged, signInWithEmailAndPassword, signOut };
