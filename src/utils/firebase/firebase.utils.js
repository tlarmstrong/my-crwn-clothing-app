// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { 
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtXcwsxnP6cItJtr8vtV8dwIXhPLzl0Qw",
  authDomain: "my-crwn-clothing-db-35067.firebaseapp.com",
  projectId: "my-crwn-clothing-db-35067",
  storageBucket: "my-crwn-clothing-db-35067.firebasestorage.app",
  messagingSenderId: "871123923857",
  appId: "1:871123923857:web:a1eb0253b80dde84406030"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  'prompt': 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// singleton
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, 
        email, 
        createdAt
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userDocRef;
}
