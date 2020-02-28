import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const notes: IEasyFirestoreModule = {
	firestorePath: 'notes',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'notes',
	statePropName: STATE_PROP_NAME,
	sync: SYNC,
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
		}
	}
};
