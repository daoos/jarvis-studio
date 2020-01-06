import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const mirrorExcGcsToGcsConfs: IEasyFirestoreModule = {
	firestorePath: 'mirror-exc-gcs-to-gcs-conf',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'mirrorExcGcsToGcsConfs',
	statePropName: STATE_PROP_NAME,
	sync: SYNC
};
