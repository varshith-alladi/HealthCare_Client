import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFpm-jzFMKUvhyPkEY6ZYuFOtgtoV5_hg",
  authDomain: "profile-picture-healthstack.firebaseapp.com",
  projectId: "profile-picture-healthstack",
  storageBucket: "profile-picture-healthstack.appspot.com",
  messagingSenderId: "206903879563",
  appId: "1:206903879563:web:c8a1f39043b7a0038eb18e",
  measurementId: "G-Q9T0BGE1YK"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
