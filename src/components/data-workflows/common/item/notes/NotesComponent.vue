<template>
	<div>
		<v-container class="mt-5">
			<v-progress-circular v-if="isLoading" class="d-flex mx-auto my-0" indeterminate size="42" color="primary" />
			<note-item
				v-else-if="Object.keys(notes).length > 0"
				v-for="note in notes"
				:key="note.id"
				:note="note"
				:module-name="moduleName"
				:related-doc-id="relatedDocId"
				@deletedNote="deletionSnackBar.isVisible = true"
			/>
			<p v-else>Any note for the moment.</p>
		</v-container>

		<note-editor :module-name="moduleName" :related-doc-id="relatedDocId" />

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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { AnyObject, Note, Snackbar } from '@/types';
import { State } from 'vuex-class';
import { notes as notesModule } from '@/store/modules/easy-firestore/notes';
import moment from 'moment';

import NoteEditor from './NoteEditor.vue';
import NoteItem from './NoteItem.vue';

import { SNACKBAR } from '@/constants/ui/snackbar';

@Component({
	components: { NoteEditor, NoteItem }
})
export default class NotesComponent extends Vue {
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;

	@State(state => state.notes.data) notes!: Note[];

	@Watch('notes')
	onActiveChange(updatedNotes: Note[]) {
		const updatedNotesValues = Object.values(updatedNotes);
		const lastUpdatedNote = updatedNotesValues[updatedNotesValues.length - 1];
		const notesValues = Object.values(this.notes);
		const lastNote = notesValues[notesValues.length - 1];

		if (!lastNote) return;

		lastUpdatedNote.user.get().then((res: any) => {
			lastNote.user = res.data();
		});
	}

	isLoading: boolean = true;
	text: string = '';
	deletionSnackBar: Snackbar = {
		color: 'success',
		isVisible: false,
		text: 'Deleted note successfully!',
		timeout: SNACKBAR.TIMEOUT
	};

	mounted() {
		this.$store.dispatch(`${notesModule.moduleName}/closeDBChannel`, { clearModule: true });
		this.$store.dispatch(`${notesModule.moduleName}/openDBChannel`, {
			moduleName: this.moduleName,
			relatedDocId: this.relatedDocId
		});
		this.$store
			.dispatch(`${notesModule.moduleName}/fetchAndAdd`, {
				moduleName: this.moduleName,
				relatedDocId: this.relatedDocId,
				orderBy: ['createdAt']
			})
			.then(() => {
				Object.values(this.notes).map(note => {
					note.createdAt = moment(note.createdAt).format('YYYY/MM/DD - HH:mm');
					if (note.updatedAt) note.updatedAt = moment(note.updatedAt).format('YYYY/MM/DD - HH:mm');

					note.user.get().then((res: any) => {
						note.user = res.data();
						return note;
					});
				});

				this.isLoading = false;
			});
	}
}
</script>
