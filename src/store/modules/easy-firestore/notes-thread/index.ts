import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { COLLECTION_REF, STATE_PROP_NAME } from '@/constants/store/easy-firestore';
import { commonModuleProperties } from '../_common/notes/module-properties';

export const notesThread: IEasyFirestoreModule = {
	firestorePath: 'notes',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'notesThread',
	statePropName: STATE_PROP_NAME,
	...commonModuleProperties
};
