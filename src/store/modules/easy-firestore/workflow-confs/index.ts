import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const workflowConfs: IEasyFirestoreModule = {
	firestorePath: 'workflow-configuration',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'workflowConfs',
	statePropName: STATE_PROP_NAME,
	sync: SYNC
};
