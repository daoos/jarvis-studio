<template>
	<div class="notes-container">
		<div v-if="Object.keys(threadNotes).length > 0" ref="notesThread" class="notes-wrapper">
			<v-toolbar dense flat class="mb-4 thread-toolbar" absolute>
				<v-toolbar-title>Thread</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-btn icon @click="closeThread">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>

			<div class="pt-10">
				<note-item
					v-for="note in threadNotes"
					:key="note.id"
					:note="note"
					:module-name="moduleName"
					:related-doc-id="relatedDocId"
					is-thread-note
				/>
			</div>
		</div>

		<v-container v-else>
			<p>Start a thread.</p>
		</v-container>

		<note-editor :isLoading="isEditorLoading" @onValidated="onValidated" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { Note } from '@/types';
import { State } from 'vuex-class';

import NotesMixin from '../notes-mixin';

@Component
export default class NoteThread extends Mixins(NotesMixin) {
	@State(state => state.notes.parentNoteId) parentNoteId!: string;
	@State(state => state.notes.threadNotes) threadNotes!: Note[];

	closeThread() {
		this.$store.commit('notes/CLOSE_THREAD_PANEL');
	}

	onValidated(text: string) {
		this.insertNote(text, this.$refs.notesThread);
	}

	get insertData() {
		return {
			account: this.account,
			isThreadNote: true,
			moduleName: this.moduleName,
			relatedDocId: this.relatedDocId,
			parentNoteId: this.parentNoteId,
			user: this.userRef
		};
	}
}
</script>

<style lang="scss">
@import 'src/scss/components/notes';

.thread-toolbar {
	width: 100%;
}
</style>
