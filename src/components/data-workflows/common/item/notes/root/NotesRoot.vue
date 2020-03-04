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
			@deletedNote="showDeletionSnackbar"
		/>
		<p v-else>Any note for the moment.</p>

		<note-editor :isLoading="isEditorLoading" @onValidated="insertNote" />

		<!-- TODO: Remove & use this one in `NotesTab` component -->
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
import { Component, Mixins } from 'vue-property-decorator';
import { Note } from '@/types';
import { State } from 'vuex-class';
import { notes as notesModule } from '@/store/modules/easy-firestore/notes';

import NotesMixin from '../notes-mixin';

@Component
export default class NotesRoot extends Mixins(NotesMixin) {
	@State(state => state.notes.data) notes!: Note[];

	notesModuleName: string = notesModule.moduleName;

	openThread(parentNote: Note) {
		// TODO: Use store
		this.$emit('openThread', parentNote);
	}

	get where() {
		return [
			['isThreadNote', '==', false],
			['moduleName', '==', this.moduleName],
			['relatedDocId', '==', this.relatedDocId]
		];
	}

	get insertData() {
		return {
			account: this.account,
			isThreadNote: false,
			moduleName: this.moduleName,
			relatedDocId: this.relatedDocId,
			user: this.userRef
		};
	}
}
</script>
