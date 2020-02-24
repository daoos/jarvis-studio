<template>
	<v-container>
		<div class="d-flex align-center">
			<avatar-component class="mr-2" :email="note.user.email" />
			<span class="mr-2">{{ note.user.displayName }}</span>
			<span>{{ note.updatedAt ? note.updatedAt : note.createdAt }}</span>
		</div>

		<!-- TODO: Use tiptap to edit content: https://tiptap.scrumpy.io/read-only -->
		<div class="ml-11 text" v-html="note.text"></div>

		<!-- TODO: Add edit btn -->
		<!-- TODO: Add delete btn -->
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from '@/types';
import AvatarComponent from '@/components/common/AvatarComponent.vue';

@Component({
	components: { AvatarComponent }
})
export default class NoteItem extends Vue {
	@Prop({ type: Object, required: true }) note!: Note;
}
</script>

<style lang="scss">
.text {
	p {
		margin: 0;
	}
}
</style>
