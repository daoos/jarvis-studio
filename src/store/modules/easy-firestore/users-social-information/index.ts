import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME, SYNC } from '@/constants/store/easy-firestore';

export const usersSocialInformation: IEasyFirestoreModule = {
	firestorePath: 'users-social-information',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'usersSocialInformation',
	statePropName: STATE_PROP_NAME,
	sync: SYNC
};
