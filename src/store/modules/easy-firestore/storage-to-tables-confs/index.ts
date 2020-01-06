import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const storageToTablesConfs: IEasyFirestoreModule = {
	firestorePath: 'storage-to-tables-conf',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'storageToTablesConfs',
	statePropName: STATE_PROP_NAME,
	sync: SYNC
};
