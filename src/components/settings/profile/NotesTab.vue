<template>
	<div>
		<p v-if="isLoading">Loading...</p>

		<template v-else>
			<div v-for="parentNote in parentNotes" :key="parentNote.id" class="mb-12">
				<note-item :note="parentNote" :module-name="parentNote.moduleName" :related-doc-id="parentNote.relatedDocId" />

				<note-item
					v-for="theadNote in getTheadNotes(parentNote.id)"
					:key="theadNote.id"
					:note="theadNote"
					:module-name="theadNote.moduleName"
					:related-doc-id="theadNote.relatedDocId"
					class="ml-6"
				/>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Note, User } from '@/types';
import { Getter, State } from 'vuex-class';
import { notes as notesModule } from '@/store/modules/easy-firestore/notes';
import moment from 'moment';

import NoteItem from '@/components/data-workflows/common/item/notes/NoteItem.vue';

@Component({
	components: { NoteItem }
})
export default class NotesTab extends Vue {
	@State(state => state.notes.data) notes!: Note[];
	@Getter('user/user') user!: User;

	isLoading: boolean = true;

	mounted() {
		const minCreatedAt = moment()
			.subtract(30, 'days')
			.toDate();

		const where = [['created_at', '>=', minCreatedAt]];

		this.$store.dispatch(`${notesModule.moduleName}/fetchAndAdd`, { where }).then(() => {
			this.isLoading = false;
		});
	}

	getTheadNotes(parentNoteId: string) {
		return Object.values(this.notes).filter((note: Note) => note.parentNoteId === parentNoteId);
	}

	get parentNotes() {
		return Object.values(this.notes).filter((note: Note) => note.created_by === this.user.uid && !note.isThreadNote);
	}
}
</script>
