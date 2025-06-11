import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv6WQFGWN-sxzYu5jgZK_1C_4G7Qo5sBc",
  authDomain: "todo-app-44b71.firebaseapp.com",
  projectId: "todo-app-44b71",
  storageBucket: "todo-app-44b71.appspot.com",
  messagingSenderId: "470583226907",
  appId: "1:470583226907:web:87f3e0ceee662492123ebe",
  measurementId: "G-3QY3GBTZ4N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

