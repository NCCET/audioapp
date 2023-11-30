import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {

  apiKey: "AIzaSyBJnQPJ-kRpUsRGyqfTzPIx7LvO7AxooU0",

  authDomain: "hotel-app-64fae.firebaseapp.com",

  projectId: "hotel-app-64fae",

  storageBucket: "hotel-app-64fae.appspot.com",

  messagingSenderId: "7111700871",

  appId: "1:7111700871:web:6a3d08db8a13c12a40e322",

  measurementId: "G-WXDTZ7BC9X"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app)

export {auth, db,getAuth}