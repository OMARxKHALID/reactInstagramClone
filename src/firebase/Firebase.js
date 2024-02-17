import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBturAl2HgrgFxkZvn0pb9nyUbS_pL-Tec",
  authDomain: "reactjsinstaclone.firebaseapp.com",
  projectId: "reactjsinstaclone",
  storageBucket: "reactjsinstaclone.appspot.com",
  messagingSenderId: "556953431560",
  appId: "1:556953431560:web:2679fbfe0de93ae019abbd",
  measurementId: "G-23R13HKK4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };