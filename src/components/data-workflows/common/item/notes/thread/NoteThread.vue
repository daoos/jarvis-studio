<template>
	<div>
		<v-toolbar dense flat>
			<v-toolbar-title>Thread</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon @click="$emit('closeThread')">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>

		<v-progress-circular v-if="isLoading" class="d-flex mx-auto my-0" indeterminate size="42" color="primary" />
		<!-- TODO: Use store -->
		<!-- TODO: Add delete snackBar -->
		<note-item
			v-else-if="Object.keys(notesThread).length > 0"
			v-for="note in notesThread"
			:key="note.id"
			:note="note"
			:module-name="moduleName"
			:related-doc-id="relatedDocId"
			is-thread-note
			@deletedNote="showDeletionSnackbar"
		/>
		<p v-else>Start a thread.</p>
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
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { AnyObject, Note, Snackbar } from '@/types';
import { notesThread as notesThreadModule } from '@/store/modules/easy-firestore/notes-thread';

import NotesMixin from '../notes-mixin';

import { SNACKBAR } from '@/constants/ui/snackbar';

@Component
export default class NoteThread extends Mixins(NotesMixin) {
	@Prop({ type: Object, required: true }) parentNote!: Note;

	@State(state => state.notesThread.data) notesThread!: Note[];

	notesModuleName: string = notesThreadModule.moduleName;

	get where() {
		return [
			['isThreadNote', '==', true],
			['parentNoteId', '==', this.parentNote.id],
			['moduleName', '==', this.moduleName],
			['relatedDocId', '==', this.relatedDocId]
		];
	}

	get insertData() {
		return {
			account: this.account,
			isThreadNote: true,
			moduleName: this.moduleName,
			relatedDocId: this.relatedDocId,
			parentNoteId: this.parentNote.id,
			user: this.userRef
		};
	}
}
</script>
