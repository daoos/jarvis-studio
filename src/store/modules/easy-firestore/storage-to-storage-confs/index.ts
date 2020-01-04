import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, SYNC } from '@/constants/store/easy-firestore';

export const storageToStorageConfs: IEasyFirestoreModule = {
	firestorePath: 'storage-to-storage-conf',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'storageToStorageConfs',
	statePropName: 'data',
	sync: SYNC
};
