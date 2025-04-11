import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQIC6SfkTGGj9z-LBDgIvNaUK-9xpg-Do",
  authDomain: "eventapp-551ef.firebaseapp.com",
  projectId: "eventapp-551ef",
  storageBucket: "eventapp-551ef.firebasestorage.app",
  messagingSenderId: "238079265024",
  appId: "1:238079265024:web:c5d8dbc4ab63fe04c50be5",
  measurementId: "G-009EV58REC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
