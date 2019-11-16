// ~config/firebase.js
import * as firebase from "firebase/app";
import "firebase/firestore";
import config from "./config";

function initFirebase() {
	firebase.initializeApp(config);
	firebase
		.auth()
		.setPersistence(firebase.auth.Auth.Persistence.SESSION)
		.catch(function(error) {
			// eslint-disable-next-line no-console
			console.error(error.message);
		});

	return new Promise(resolve => {
		firebase
			.firestore()
			.enablePersistence()
			.then(resolve)
			.catch(err => {
				if (err.code === "failed-precondition") {
					// Multiple tabs open, persistence can only be
					// enabled in one tab at a a time.
				} else if (err.code === "unimplemented") {
					// The current browser does not support all of
					// the features required to enable persistence
				}
			});
	});
}

export { firebase, initFirebase };
