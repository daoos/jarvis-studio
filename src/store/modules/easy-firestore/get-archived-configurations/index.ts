import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const getArchivedConfigurations: IEasyFirestoreModule = {
	firestorePath: '{type}/{id}/history',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'getArchivedConfigurations',
	statePropName: STATE_PROP_NAME,
	sync: SYNC
};
