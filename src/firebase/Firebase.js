import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBturAl2HgrgFxkZvn0pb9nyUbS_pL-Tec",
  authDomain: "reactjsinstaclone.firebaseapp.com",
  projectId: "reactjsinstaclone",
  storageBucket: "reactjsinstaclone.appspot.com",
  messagingSenderId: "556953431560",
  appId: "1:556953431560:web:2679fbfe0de93ae019abbd",
  measurementId: "G-23R13HKK4D",
  databaseUrl: "https://reactjsinstaclone-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); 

export { app, auth, db};