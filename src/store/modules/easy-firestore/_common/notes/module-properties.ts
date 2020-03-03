import { SyncHookDoc, ServerChangeHook } from 'vuex-easy-firestore/types/module/defaultConfig';

interface CommonModuleProperties {
	sync: {
		orderBy: string[];
		insertHook: SyncHookDoc;
	};
	serverChange: {
		addedHook: ServerChangeHook;
		modifiedHook: ServerChangeHook;
		convertTimestamps: {
			created_at: string;
			updated_at: string;
		};
	};
}

export const commonModuleProperties: CommonModuleProperties = {
	sync: {
		orderBy: ['created_at'],
		insertHook: function(updateStore, doc, store) {
			const user = store.getters['user/user'];

			doc.user.displayName = user.displayName;
			doc.user.photoURL = user.photoURL;
			doc.user.email = user.email;

			updateStore(doc);
		}
	},
	serverChange: {
		addedHook: function(updateStore, note) {
			note.user.get().then((res: any) => {
				note.user = res.data();
				updateStore(note);
			});
		},
		modifiedHook: function(updateStore, note) {
			note.user.get().then((res: any) => {
				note.user = res.data();
				updateStore(note);
			});
		},
		convertTimestamps: {
			created_at: '%convertTimestamp%',
			updated_at: '%convertTimestamp%'
		}
	}
};
