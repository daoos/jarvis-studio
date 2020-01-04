import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const vmLauncherConfs: IEasyFirestoreModule = {
	firestorePath: 'vm-launcher-conf',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'vmLauncherConfs',
	statePropName: STATE_PROP_NAME,
	sync: SYNC
};
