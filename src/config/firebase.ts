import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FirebaseOptions } from '@firebase/app-types';

const options: FirebaseOptions = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
};

function initFirebase() {
	firebase.initializeApp(options);

	firebase
		.auth()
		.setPersistence(firebase.auth.Auth.Persistence.SESSION)
		.catch(error => console.error(error.message));

	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.enablePersistence()
			.then(resolve)
			.catch(err => {
				if (err.code === 'failed-precondition') {
					// Multiple tabs open, persistence can only be enabled in one tab at a a time.
					reject(err);
				} else if (err.code === 'unimplemented') {
					// The current browser does not support all of the features required to enable persistence
					reject(err);
				}
			});
	});
}

export { firebase, initFirebase };
