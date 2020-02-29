<template>
	<v-container
		class="note-item transition-ease-in-out"
		:class="{ 'grey lighten-3': isFocused }"
		@mouseenter="isHovering = true"
		@mouseleave="isHovering = false"
	>
		<div class="d-flex align-center">
			<avatar-component class="mr-2" :email="note.user.email" />
			<span class="mr-2 font-weight-bold">{{ note.user.displayName }}</span>
			<span class="mr-2">{{ getFormattedTimestamp(note.created_at) }}</span>
			<span v-if="note.updated_at" class="mr-2">(edited {{ getFormattedTimestamp(note.updated_at) }})</span>

			<v-spacer />

			<v-btn v-if="showActions" x-small class="mr-2" @click="toggleIsEditing">
				<v-icon x-small>mdi-pencil</v-icon>
			</v-btn>

			<v-btn v-if="showActions" :loading="isDeleting" x-small color="error" @click="deleteNote">
				<v-icon x-small>mdi-delete</v-icon>
			</v-btn>
		</div>

		<note-editor
			v-if="isEditing"
			:module-name="moduleName"
			:related-doc-id="relatedDocId"
			:default-text="note.text"
			:is-editing="isEditing"
			:note-id="note.id"
			@noteEdited="toggleIsEditing"
		/>
		<div v-else class="ml-11 text" v-html="note.text"></div>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Note, User } from '@/types';
import { firebase } from '@/config/firebase';
import { notes as notesModule } from '@/store/modules/easy-firestore/notes';
import moment from 'moment';
import AvatarComponent from '@/components/common/AvatarComponent.vue';
import NoteEditor from './NoteEditor.vue';

@Component({
	components: { AvatarComponent, NoteEditor }
})
export default class NoteItem extends Vue {
	@Prop({ type: Object, required: true }) note!: Note;
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;

	@Getter('user/user') user!: User;

	isHovering: boolean = false;
	isEditing: boolean = false;
	isDeleting: boolean = false;

	beforeDestroy() {
		this.$emit('deletedNote');
	}

	toggleIsEditing() {
		this.isEditing = !this.isEditing;
	}

	deleteNote() {
		this.isDeleting = true;

		this.$store
			.dispatch(`${notesModule.moduleName}/delete`, this.note.id)
			.then(() => {
				this.isDeleting = false;
			})
			.catch(err => {
				console.log(err);
			});
	}

	get isFocused(): boolean {
		return this.isEditing || this.isHovering;
	}

	get showActions(): boolean {
		return this.isFocused && this.user.uid === this.note.created_by;
	}

	getFormattedTimestamp(timestamp: string): string {
		const now = moment(Date.now());
		const reference = moment(timestamp);
		const oneHourAfter = moment(timestamp).add(1, 'hours');
		const oneDayAfter = moment(timestamp).add(1, 'day');

		if (now.isAfter(oneDayAfter)) return reference.format('YYYY/MM/DD - HH:mm');
		return now.isAfter(oneHourAfter) ? reference.format('HH:mm') : reference.fromNow();
	}
}
</script>

<style lang="scss">
.note-item {
	border-radius: 6px;

	.text {
		p {
			margin: 0;
		}
	}
}
</style>
