import firebase from 'firebase/app';
import 'firebase/database';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DBURL,
    storageBucket: process.env.REACT_APP_SBucket
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database()

export { firebaseDB }