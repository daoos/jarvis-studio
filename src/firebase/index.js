import firebase from "firebase";
import config from "./config";

export const firebaseApp = firebase.initializeApp(config);

firebase
	.auth()
	.setPersistence(firebase.auth.Auth.Persistence.SESSION)
	.catch(function(error) {
		// eslint-disable-next-line no-console
		console.error("Error initializing firebase");
		// eslint-disable-next-line no-console
		console.error(error.message);
	});

export const db = firebaseApp.firestore();
