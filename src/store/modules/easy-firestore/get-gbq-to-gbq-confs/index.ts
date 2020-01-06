import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const getGbqToGbqConfs: IEasyFirestoreModule = {
	firestorePath: 'gbq-to-gbq-conf',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'getGbqToGbqConfs',
	statePropName: STATE_PROP_NAME,
	sync: SYNC
};
