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
			<span class="mr-2">{{ note.updatedAt ? note.updatedAt : note.createdAt }}</span>

			<v-spacer />

			<v-btn v-if="isHovering" x-small @click="toggleIsEditing">
				<v-icon x-small>mdi-pencil</v-icon>
			</v-btn>

			<!-- TODO: Add delete btn -->
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
