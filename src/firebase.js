// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBzGc4qL1t6HdoiADxTnaFTZaRJOMlFQsU",
    authDomain: "persnal-finance.firebaseapp.com",
    projectId: "persnal-finance",
    storageBucket: "persnal-finance.appspot.com",
    messagingSenderId: "173822467427",
    appId: "1:173822467427:web:8439c8de3c8051b78cc756",
    measurementId: "G-BQREF20F1Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export {db,auth,provider}