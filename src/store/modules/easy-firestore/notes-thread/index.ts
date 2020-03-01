import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME } from '@/constants/store/easy-firestore';

export const notesThread: IEasyFirestoreModule = {
	firestorePath: 'notes/{noteId}/thread',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'notesThread',
	statePropName: STATE_PROP_NAME,
	sync: {
		orderBy: ['created_at']
		// insertHook: function(updateStore, doc, store) {
		// 	const user = store.getters['user/user'];

		// 	doc.user.displayName = user.displayName;
		// 	doc.user.photoURL = user.photoURL;
		// 	doc.user.email = user.email;

		// 	updateStore(doc);
		// }
	}
	// serverChange: {
	// 	addedHook: function(updateStore, note) {
	// 		note.user.get().then((res: any) => {
	// 			note.user = res.data();
	// 			updateStore(note);
	// 		});
	// 	},
	// 	modifiedHook: function(updateStore, note) {
	// 		note.user.get().then((res: any) => {
	// 			note.user = res.data();
	// 			updateStore(note);
	// 		});
	// 	},
	// 	convertTimestamps: {
	// 		created_at: '%convertTimestamp%',
	// 		updated_at: '%convertTimestamp%'
	// 	}
	// }
};
