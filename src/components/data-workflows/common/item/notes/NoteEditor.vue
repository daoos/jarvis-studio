<template>
	<v-form>
		<v-container>
			<v-row>
				<v-col cols="12">
					<tiptap-vuetify v-model="text" :extensions="extensions" class="editor my-4" />
					<v-btn
						:loading="isLoaging"
						:disabled="isSaveButtonDisabled"
						color="primary"
						class="float-right"
						@click="isEditing ? editNote() : insertNote()"
					>
						{{ buttonValue }}
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '@/types';
import { Getter } from 'vuex-class';
import { firebase } from '@/config/firebase';
import { notes as notesModule } from '@/store/modules/easy-firestore/notes';
import { usersSocialInformation } from '@/store/modules/easy-firestore/users-social-information';
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

@Component({
	components: { TiptapVuetify }
})
export default class NoteEditor extends Vue {
	@Prop(String) defaultText?: string;
	@Prop(Boolean) isEditing?: boolean;
	@Prop(String) noteId?: string;
	@Prop({ type: String, required: true }) moduleName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;
	@Prop({ type: String, required: true }) account!: string;

	@Getter('user/user') user!: User;

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
	isLoaging: boolean = false;

	mounted() {
		if (this.defaultText) this.text = this.defaultText;
	}

	insertNote() {
		this.isLoaging = true;

		const usersRef = firebase
			.firestore()
			.collection(usersSocialInformation.firestorePath)
			.doc(this.user.uid);
		this.$store
			.dispatch(`${notesModule.moduleName}/insert`, {
				account: this.account,
				moduleName: this.moduleName,
				// TODO: Rename relatedDocId => objectId
				relatedDocId: this.relatedDocId,
				text: this.text,
				user: usersRef,
				createdAt: firebase.firestore.Timestamp.now(),
				updatedAt: null
			})
			.then(() => {
				this.text = '';
				this.isLoaging = false;
			});
	}

	editNote() {
		this.isLoaging = true;
		this.$store
			.dispatch(`${notesModule.moduleName}/patch`, {
				id: this.noteId,
				text: this.text,
				updatedAt: firebase.firestore.Timestamp.now()
			})
			.then(() => {
				this.$emit('noteEdited');
				this.isLoaging = false;
			})
			.catch(err => {
				console.error(err);
				this.isLoaging = false;
			});
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
