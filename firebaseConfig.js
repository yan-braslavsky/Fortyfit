// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration object
  // You'll need to replace this with your actual Firebase config
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

  apiKey: "AIzaSyBR-Gz9XGQj-lp_yx4xcqMxsUVWQbeV-e4",
  authDomain: "fourtyfit-44a5b.firebaseapp.com",
  projectId: "fourtyfit-44a5b",
  storageBucket: "fourtyfit-44a5b.appspot.com",
  messagingSenderId: "143026831684",
  appId: "1:143026831684:web:841f10900b0b96255d9711",
  measurementId: "G-S7VW2DCQ1J"
};

const app = initializeApp(firebaseConfig,'EXPO_APP');
export const db = getFirestore(app);