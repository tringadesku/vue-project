import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCso4EDUZAd5HElzs-7dntVa47kqAWcYgk",
  authDomain: "job-match-152d4.firebaseapp.com",
  projectId: "job-match-152d4",
  storageBucket: "job-match-152d4.appspot.com",
  messagingSenderId: "741664769895",
  appId: "1:741664769895:web:7d8ec10b55e7d2dfb111c2"
};

// init firebase
initializeApp(firebaseConfig)

// init firebase auth
const auth = getAuth()
const db = getFirestore();
export { auth, db }