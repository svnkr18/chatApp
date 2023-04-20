import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlgajQAEQqYVZ7izvJT3__GGhX77Rs4zk",
  authDomain: "chatapp-41d51.firebaseapp.com",
  projectId: "chatapp-41d51",
  storageBucket: "chatapp-41d51.appspot.com",
  messagingSenderId: "871156323521",
  appId: "1:871156323521:web:d7739ac0bd776ab58af040",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
