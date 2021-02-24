import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATz3EQpHbsVjjy_01dhQhaJZzv2QltTk8",
  authDomain: "food-chronicles.firebaseapp.com",
  projectId: "food-chronicles",
  storageBucket: "food-chronicles.appspot.com",
  messagingSenderId: "739538463863",
  appId: "1:739538463863:web:27fa1a87f5cd44a7b36a72",
  measurementId: "G-6BK38B29FW",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
