import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhADzfwrick_DOmmESMBajh75O8XW48IY",
  authDomain: "instaclo-2e4f6.firebaseapp.com",
  projectId: "instaclo-2e4f6",
  storageBucket: "instaclo-2e4f6.appspot.com",
  messagingSenderId: "345933306094",
  appId: "1:345933306094:web:c4296355204389bb70fbff",
  measurementId: "G-P5LW7H4GQ1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app)
export { app, auth, firestore, storage };
