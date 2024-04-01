import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJmS0F4k0vwrrVP-bsxDcCUdfLZcEf_SQ",
  authDomain: "mpesa-25a2b.firebaseapp.com",
  projectId: "mpesa-25a2b",
  storageBucket: "mpesa-25a2b.appspot.com",
  messagingSenderId: "851056609502",
  appId: "1:851056609502:web:b234bc14eb5bc0147ada4f",
  measurementId: "G-K6XBBF253T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
