<template>
	<div>
		<v-container class="mt-5">
			<v-row>
				<v-col :cols="showThreadPanel ? 8 : 12">
					<notes-root
						:module-name="moduleName"
						:related-doc-id="relatedDocId"
						:account="account"
						@openThread="openThread"
					/>
				</v-col>

				<v-col v-if="showThreadPanel" cols="4">
					<note-thread
						:module-name="moduleName"
						:related-doc-id="relatedDocId"
						:account="account"
						:parentNote="parentNote"
						@closeThread="toggleThreadPanel"
					/>
				</v-col>
			</v-row>
		</v-container>

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
import { Note, Snackbar } from '@/types';

import NotesRoot from './root/NotesRoot.vue';
import NoteThread from './thread/NoteThread.vue';

import { SNACKBAR } from '@/constants/ui/snackbar';

@Component({
	components: { NotesRoot, NoteThread }
})
export default class NotesTab extends Vue {
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;
	@Prop({ type: String, required: true }) account!: string;

	showThreadPanel: boolean = false;
	parentNote!: Note | null;
	deletionSnackBar: Snackbar = {
		color: 'success',
		isVisible: false,
		text: 'Deleted note successfully!',
		timeout: SNACKBAR.TIMEOUT
	};

	toggleThreadPanel() {
		this.showThreadPanel = !this.showThreadPanel;
	}

	openThread(note: Note) {
		this.parentNote = note;
		this.toggleThreadPanel();
	}
}
</script>
