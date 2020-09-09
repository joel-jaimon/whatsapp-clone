import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// add firebaseConfig file here...........
const firebaseConfig = {
  apiKey: "AIzaSyDn4n3qI42bVFfByfRmKVdeMMcwd4pWTAE",
  authDomain: "whatsapp-clone-738d9.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-738d9.firebaseio.com",
  projectId: "whatsapp-clone-738d9",
  storageBucket: "whatsapp-clone-738d9.appspot.com",
  messagingSenderId: "1009891455783",
  appId: "1:1009891455783:web:fcd226817f7db9d480af02",
  measurementId: "G-PSCZP0D5WR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
