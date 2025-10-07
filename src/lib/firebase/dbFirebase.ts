import { initializeApp } from "firebase/app";
import {
  getDatabase,
  child, 
  get, 
  onValue, 
  ref, 
  set 
} from "firebase/database";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId ,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
  databaseURL: "https://auroramap-aae9e-default-rtdb.firebaseio.com/"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase()

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  db,
  child,
  get, 
  onValue,
  ref, 
  set
}


