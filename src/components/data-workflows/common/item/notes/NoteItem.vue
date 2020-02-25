<template>
	<v-container
		class="note-item transition-ease-in-out"
		:class="{ 'grey lighten-3': isHovering }"
		@mouseenter="toggleIsHovering"
		@mouseleave="toggleIsHovering"
	>
		<div class="d-flex align-center">
			<avatar-component class="mr-2" :email="note.user.email" />
			<span class="mr-2">{{ note.user.displayName }}</span>
			<span class="mr-2">{{ note.createdAt }}</span>
			<span v-if="note.updatedAt" class="mr-2">(edited {{ note.updatedAt }})</span>

			<v-spacer />

			<v-btn v-if="isHovering" x-small class="mr-2" @click="toggleIsEditing">
				<v-icon x-small>mdi-pencil</v-icon>
			</v-btn>

			<v-btn v-if="isHovering" x-small color="error" @click="deleteNote">
				<v-icon x-small>mdi-delete</v-icon>
			</v-btn>
		</div>

		<note-editor
			v-if="isEditing"
			:related-collection-name="relatedCollectionName"
			:related-doc-id="relatedDocId"
			:default-text="note.text"
			:is-editing="isEditing"
			:note-id="note.id"
			@noteEdited="isEditing = false"
		/>
		<div v-else class="ml-11 text" v-html="note.text"></div>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from '@/types';
import { firebase } from '@/config/firebase';
import AvatarComponent from '@/components/common/AvatarComponent.vue';
import NoteEditor from './NoteEditor.vue';

@Component({
	components: { AvatarComponent, NoteEditor }
})
export default class NoteItem extends Vue {
	@Prop({ type: Object, required: true }) note!: Note;
	@Prop({ type: String, required: true }) relatedCollectionName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;

	isHovering: boolean = false;
	isEditing: boolean = false;

	toggleIsHovering() {
		this.isHovering = !this.isHovering;
	}

	toggleIsEditing() {
		this.isEditing = !this.isEditing;
	}

	deleteNote() {
		const deleteNote = firebase.functions().httpsCallable('deleteNote');
		deleteNote({
			noteId: this.note.id,
			relatedCollectionName: this.relatedCollectionName,
			relatedDocId: this.relatedDocId
		})
			.then(() => {
				// TODO: Show snackBar
			})
			.catch(err => {
				console.error(err);
			});
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
