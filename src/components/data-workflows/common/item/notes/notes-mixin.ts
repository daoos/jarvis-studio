import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject, Snackbar, User } from '@/types';
import { Getter } from 'vuex-class';
import { firebase } from '@/config/firebase';
import { users } from '@/store/modules/easy-firestore/users';
import { SNACKBAR } from '@/constants/ui/snackbar';

import NoteEditor from './editor/NoteEditor.vue';
import NoteItem from './NoteItem.vue';

@Component({
	components: { NoteEditor, NoteItem }
})
export default class NotesMixin extends Vue {
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;
	@Prop({ type: String, required: true }) account!: string;

	@Getter('user/user') user!: User;

	notesModuleName: string = '';
	isLoading: boolean = true;
	isEditorLoading: boolean = false;
	deletionSnackBar: Snackbar = {
		color: 'success',
		isVisible: false,
		text: 'Deleted note successfully!',
		timeout: SNACKBAR.TIMEOUT
	};

	mounted() {
		this.fetchNotes();
	}

	activated() {
		this.fetchNotes();
	}

	fetchNotes() {
		if (!this.where) throw new Error('You must provide a where getter.');

		this.$store.dispatch(`${this.notesModuleName}/closeDBChannel`, { clearModule: true });
		this.$store.dispatch(`${this.notesModuleName}/openDBChannel`, { where: this.where });
		this.$store.dispatch(`${this.notesModuleName}/fetchAndAdd`, { where: this.where }).then(() => {
			this.isLoading = false;
		});
	}

	insertNote(text: string) {
		if (Object.keys(this.insertData).length === 0) throw new Error('You must provide inserData');

		this.isEditorLoading = true;

		this.$store
			.dispatch(`${this.notesModuleName}/insert`, { ...this.insertData, text })
			.then(() => {
				this.isEditorLoading = false;
			})
			.catch(err => {
				console.error(err);
				this.isEditorLoading = false;
			});
	}

	showDeletionSnackbar() {
		// TODO: Use store to show this in `NotesTab` component
		this.deletionSnackBar.isVisible = true;
	}

	get where(): (string | boolean)[][] {
		return [];
	}

	get insertData(): AnyObject {
		return {};
	}

	get userRef() {
		return firebase
			.firestore()
			.collection(users.firestorePath)
			.doc(this.user.uid);
	}
}
