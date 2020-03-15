import { IEasyFirestoreModule } from 'vuex-easy-firestore/types/declarations';
import { Note, NotesState } from '@/types';
import { COLLECTION_REF, STATE_PROP_NAME } from '@/constants/store/easy-firestore';

export const notes: IEasyFirestoreModule = {
	firestorePath: 'notes',
	firestoreRefType: COLLECTION_REF,
	moduleName: 'notes',
	statePropName: STATE_PROP_NAME,
	state: {
		parentNoteId: null,
		threadNotes: [],
		showThreadPanel: false
	},
	mutations: {
		SET_PARENT_NOTE_ID(state: NotesState, parentNoteId: string) {
			state.parentNoteId = parentNoteId;
		},
		SET_THREAD_NOTES(state: NotesState, threadNotes: Note[]) {
			state.threadNotes = threadNotes;
		},
		OPEN_THREAD_PANEL(state: NotesState, { parentNoteId, threadNotes }: { parentNoteId: string; threadNotes: Note[] }) {
			state.parentNoteId = parentNoteId;
			state.threadNotes = threadNotes;
			state.showThreadPanel = true;
		},
		CLOSE_THREAD_PANEL(state: NotesState) {
			state.showThreadPanel = false;
			state.parentNoteId = null;
			state.threadNotes = null;
		},
		PUSH_NOTE_TO_THREAD(state: NotesState, note: Note) {
			state.threadNotes = [...state.threadNotes!, note];
		},
		REMOVE_NOTE_FROM_THREAD(state: NotesState, id: string) {
			state.threadNotes = state.threadNotes!.filter((note: Note) => note.id !== id);
		}
	},
	sync: {
		orderBy: ['created_at'],
		insertHook: function(updateStore, doc, store) {
			const user = store.getters['user/user'];

			doc.user.displayName = user.displayName;
			doc.user.photoURL = user.photoURL;
			doc.user.email = user.email;

			if (doc.isThreadNote) store.commit('notes/PUSH_NOTE_TO_THREAD', doc);

			updateStore(doc);
		},
		deleteHook: function(updateStore, id, store) {
			store.commit('notes/REMOVE_NOTE_FROM_THREAD', id);
			updateStore(id);
		}
	},
	serverChange: {
		addedHook: function(updateStore, note) {
			note.user.get().then((res: any) => {
				note.user = res.data();
				updateStore(note);
			});
		},
		modifiedHook: function(updateStore, note) {
			note.user.get().then((res: any) => {
				note.user = res.data();
				updateStore(note);
			});
		},
		convertTimestamps: {
			created_at: '%convertTimestamp%',
			updated_at: '%convertTimestamp%'
		}
	}
};
