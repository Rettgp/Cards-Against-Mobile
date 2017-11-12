import firebase from "firebase";
var config = {
		apiKey: "AIzaSyCK0LJ8bM41qaJjK_NyJ8LwErFUZdqEmdM",
		authDomain: "cah-mobile.firebaseapp.com",
		databaseURL: "https://cah-mobile.firebaseio.com",
		storageBucket: "firebase-cah-mobile.appspot.com",
};
var firebaseApp = firebase.initializeApp(config)
export const DB = firebaseApp.database()