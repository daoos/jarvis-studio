import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const tableToStorageConfs: IEasyFirestoreModule = {
	firestorePath: 'table-to-storage-conf',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'tableToStorageConfs',
	statePropName: STATE_PROP_NAME,
	sync: SYNC
};
