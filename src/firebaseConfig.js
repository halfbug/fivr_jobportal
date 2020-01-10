import * as firebaseConfig from "firebase";
import 'firebase/firestore';
import 'firebase/auth';


// replace this variable, with your own config variable
// from your firebase project
var config = {
    apiKey: "AIzaSyDQkfk-fcplvUIPOEFYi2aWxdyW3q6vNQ4",
    authDomain: "jobportal-a1546.firebaseapp.com",
    databaseURL: "https://jobportal-a1546.firebaseio.com",
    projectId: "jobportal-a1546",
    storageBucket: "jobportal-a1546.appspot.com",
    messagingSenderId: "806746095377",
    appId: "1:806746095377:web:50764774a3eb0b0420d6b0",
    measurementId: "G-6G3BT1J4TH"
};
let firebase = firebaseConfig.initializeApp(config);
let firestore = firebaseConfig.firestore();
const firefunctions = firebaseConfig.functions();

firebase.firestore().settings({ timestampsInSnapshots: true });

export { firebase, firestore, firefunctions} ;