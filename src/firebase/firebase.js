import * as firebase from "firebase";
import expenses from "../selectors/expenses";
const config = {
  apiKey: "AIzaSyBaucujsTrlTHN3d6Z-MjL-lYbmcWy4TF0",
  authDomain: "expense-tracker-ca13b.firebaseapp.com",
  databaseURL: "https://expense-tracker-ca13b.firebaseio.com",
  projectId: "expense-tracker-ca13b",
  storageBucket: "expense-tracker-ca13b.appspot.com",
  messagingSenderId: "545660500727"
};
firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };
