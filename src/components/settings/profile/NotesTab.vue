<template>
	<v-container>
		<v-progress-circular v-if="isLoading" class="d-flex mx-auto mt-12" indeterminate size="42" color="primary" />

		<template v-else>
			<div v-for="(stack, index) in notesStack" :key="`note-block-${index}`" class="mb-12" outlined>
				<!--<router-link :to="stack.link.to">{{ stack.link.label }}</router-link>-->
				<!--<p v-for="user in getInvolvedUsers(parentNote)" :key="user.id" class="mb-0 body-2">{{ user.displayName }}</p>-->

				<v-card outlined class="mt-2">
					<div v-for="parentNote in stack" :key="parentNote.id">
						<note-item :note="parentNote" :read-only="true" />

						<note-item
							v-for="theadNote in getThreadNotes(parentNote.id)"
							:key="theadNote.id"
							:note="theadNote"
							:read-only="true"
							:is-thread-note="true"
							class="pl-12"
						/>
					</div>
				</v-card>
			</div>
		</template>
	</v-container>
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
	@Getter('notes/formattedNotes') formattedNotes!: Note[];

	isLoading: boolean = true;
	notesStack: any = []; // TODO: type

	mounted() {
		const minCreatedAt = moment()
			.subtract(30, 'days')
			.toDate();

		// const where = [['created_at', '>=', minCreatedAt]];

		this.$store.dispatch(`${notesModule.moduleName}/fetchAndAdd`).then(() => {
			this.setNotesStack();
			this.isLoading = false;
		});
	}

	// TODO: Share with NotesRoot
	getThreadNotes(parentNoteId: string) {
		return Object.values(this.notes).filter((note: Note) => note.parentNoteId === parentNoteId);
	}

	// TODO: Share with NotesRoot
	getInvolvedUsers(parentNote: Note) {
		const users = this.getThreadNotes(parentNote.id).map(note => note.user);

		return users.filter((obj, pos, arr) => {
			return arr.map(mapObj => mapObj.id).indexOf(obj.id) === pos;
		});
	}

	setNotesStack() {
		this.notesStack = Object.values(this.notes)
			.filter((note: Note) => note.created_by === this.user.uid && !note.isThreadNote)
			.reduce((accumulator, currentValue) => {
				accumulator[currentValue.relatedDocId] = [...(accumulator[currentValue.relatedDocId] || []), currentValue];
				return accumulator;
			}, {});

		/*return mapValues(groupBy(parentNotes, key), clist => {
			const reference = clist[0];

			return {
				link: {
					label: `${reference.moduleName} / ${reference.relatedDocId}`,
					to: {
						name: reference.routeName,
						params: { id: reference.relatedDocId }
					}
				},
				values: clist.map(note => {
					return {
						...omit(note, key),
						threadNotes: this.getThreadNotes(note.id)
					};
				})
			};
		});*/
	}
}
</script>
