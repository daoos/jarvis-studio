<template>
	<v-form>
		<v-container>
			<v-row>
				<v-col cols="12">
					<tiptap-vuetify v-model="text" :extensions="extensions" class="editor my-4" />
					<v-btn :disabled="isSaveButtonDisabled" color="primary" @click="insertNote">Save note</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note, UserSocialInformation } from '@/types';
import { notes } from '@/store/modules/easy-firestore/notes';
import { firebase } from '@/config/firebase';
import {
	TiptapVuetify,
	Heading,
	Bold,
	Italic,
	Strike,
	Underline,
	Code,
	Paragraph,
	BulletList,
	OrderedList,
	ListItem,
	Link,
	Blockquote,
	HardBreak,
	HorizontalRule,
	History
} from 'tiptap-vuetify';

interface MenuBarItem {
	classValidator: boolean;
	clickAction: () => {};
	icon: string;
}

@Component({
	components: { TiptapVuetify }
})
export default class NoteForm extends Vue {
	@Prop({ type: String, required: true }) relatedCollectionName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;

	text = '';
	extensions = [
		History,
		Blockquote,
		Link,
		Underline,
		Strike,
		Italic,
		ListItem,
		BulletList,
		OrderedList,
		[
			Heading,
			{
				options: {
					levels: [1, 2, 3]
				}
			}
		],
		Bold,
		Code,
		HorizontalRule,
		Paragraph,
		HardBreak
	];

	insertNote() {
		if (!this.text) return;

		const insertNote = firebase.functions().httpsCallable('insertNote');
		insertNote({
			relatedCollectionName: this.relatedCollectionName,
			relatedDocId: this.relatedDocId,
			text: this.text
		})
			.then(() => {
				this.text = '';
			})
			.catch(err => {
				console.error(err);
			});
	}

	get isSaveButtonDisabled(): boolean {
		return this.text.length <= 7;
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
