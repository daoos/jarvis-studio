<template>
	<div>
		<v-progress-circular v-if="isLoading" class="d-flex mx-auto my-0" indeterminate size="42" color="primary" />
		<note-item
			v-else-if="Object.keys(notes).length > 0"
			v-for="note in notes"
			:key="note.id"
			:note="note"
			:module-name="moduleName"
			:related-doc-id="relatedDocId"
			@openThread="openThread"
			@deletedNote="deletionSnackBar.isVisible = true"
		/>
		<p v-else>Any note for the moment.</p>

		<note-editor :isLoading="isEditorLoading" @onValidated="insertNote" />

		<v-snackbar
			v-model="deletionSnackBar.isVisible"
			:color="deletionSnackBar.color"
			:timeout="deletionSnackBar.timeout"
		>
			{{ deletionSnackBar.text }}
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note, Snackbar, User } from '@/types';
import { Getter, State } from 'vuex-class';
import { firebase } from '@/config/firebase';
import { notes as notesModule } from '@/store/modules/easy-firestore/notes';
import { users } from '@/store/modules/easy-firestore/users';
import { SNACKBAR } from '@/constants/ui/snackbar';

import NoteEditor from '../editor/NoteEditor.vue';
import NoteItem from '../NoteItem.vue';

@Component({
	components: { NoteEditor, NoteItem }
})
export default class NotesRoot extends Vue {
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;
	@Prop({ type: String, required: true }) account!: string;

	@State(state => state.notes.data) notes!: Note[];

	@Getter('user/user') user!: User;

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
		const where = [
			// TODO: Add thread == false
			['moduleName', '==', this.moduleName],
			['relatedDocId', '==', this.relatedDocId]
		];

		this.$store.dispatch(`${notesModule.moduleName}/closeDBChannel`, { clearModule: true });
		this.$store.dispatch(`${notesModule.moduleName}/openDBChannel`, { where });
		this.$store.dispatch(`${notesModule.moduleName}/fetchAndAdd`, { where }).then(() => {
			this.isLoading = false;
		});
	}

	insertNote(text: string) {
		this.isEditorLoading = true;

		const usersRef = firebase
			.firestore()
			.collection(users.firestorePath)
			.doc(this.user.uid);
		this.$store
			.dispatch(`${notesModule.moduleName}/insert`, {
				account: this.account,
				moduleName: this.moduleName,
				// TODO: Rename relatedDocId => objectId
				relatedDocId: this.relatedDocId,
				text,
				user: usersRef
			})
			.then(() => {
				this.isEditorLoading = false;
			})
			.catch(err => {
				console.error(err);
				this.isEditorLoading = false;
			});
	}

	openThread(parentNote: Note) {
		// TODO: Use store
		this.$emit('openThread', parentNote);
	}
}
</script>
