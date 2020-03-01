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
		/>
		<p v-else>Start a thread.</p>
		<note-editor />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { AnyObject, Note, Snackbar } from '@/types';
import { notesThread as notesThreadModule } from '@/store/modules/easy-firestore/notes-thread';

import NoteEditor from '../editor/NoteEditor.vue';
import NoteItem from '../NoteItem.vue';

import { SNACKBAR } from '@/constants/ui/snackbar';

@Component({
	components: { NoteEditor, NoteItem }
})
export default class NoteThread extends Vue {
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;
	@Prop({ type: String, required: true }) account!: string;
	@Prop({ type: Object, required: true }) parentNote!: Note;

	@State(state => state.notesThread.data) notesThread!: Note[];

	isLoading: boolean = true;

	mounted() {
		// this.$store.dispatch(`${noteThread.moduleName}/closeDBChannel`, { clearModule: true });
		// this.$store.dispatch(`${noteThread.moduleName}/openDBChannel`);
		this.$store.dispatch(`${notesThreadModule.moduleName}/fetchAndAdd`, { noteId: this.parentNote.id }).then(() => {
			this.isLoading = false;
		});
	}
}
</script>
