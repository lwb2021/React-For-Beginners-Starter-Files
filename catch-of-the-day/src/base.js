// for firebase
import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAmVRSK1-wxi1Av_fnqNPdmqY8B5-_eWaM",
  authDomain: "catch-of-the-day-fb2a4.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-fb2a4-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
