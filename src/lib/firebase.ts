import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsV89IMe9XRwTWWW82dDGldqSfQT8BnvY",
  authDomain: "finalproject-chat.firebaseapp.com",
  projectId: "finalproject-chat",
  storageBucket: "finalproject-chat.firebasestorage.app",
  messagingSenderId: "165614444124",
  appId: "1:165614444124:web:cd0c6922ec8dd8f149d099",
  measurementId: "G-YW9W2GMX2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);