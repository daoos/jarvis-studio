<template>
	<div>
		<tiptap-vuetify v-model="text" :extensions="extensions" class="editor my-4" />
		<v-btn
			:loading="isLoading"
			:disabled="isSaveButtonDisabled"
			color="primary"
			class="float-right"
			@click="onValidated"
		>
			{{ buttonValue }}
		</v-btn>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '@/types';
import { Getter } from 'vuex-class';
import { firebase } from '@/config/firebase';
import { notes as notesModule } from '@/store/modules/easy-firestore/notes';
import { users } from '@/store/modules/easy-firestore/users';
import { TiptapVuetify } from 'tiptap-vuetify';

import extenstions from './extenstions';

@Component({
	components: { TiptapVuetify }
})
export default class NoteEditor extends Vue {
	@Prop(String) defaultText?: string;
	@Prop(Boolean) isEditing?: boolean;
	@Prop({ type: Boolean, required: true }) isLoading!: boolean;

	@Getter('user/user') user!: User;

	text = '';
	extensions = extenstions;

	mounted() {
		if (this.defaultText) this.text = this.defaultText;
	}

	onValidated() {
		this.$emit('onValidated', this.text);
		this.text = '';
	}

	get isSaveButtonDisabled(): boolean {
		return this.isEditing ? this.text === this.defaultText : this.text.length <= 7;
	}

	get buttonValue(): string {
		return this.isEditing ? 'Edit note' : 'Save note';
	}
}
</script>

<style lang="scss">
.editor {
	p {
		outline: none;
		margin: 0;
	}

	.tiptap-vuetify-editor__content {
		padding: 24px 16px;

		.ProseMirror-focused {
			outline: none !important;
		}
	}
}
</style>
