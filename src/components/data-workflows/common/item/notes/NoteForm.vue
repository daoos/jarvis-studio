<template>
	<v-form>
		<v-container>
			<v-row>
				<v-col cols="12">
					<v-textarea
						v-model="text"
						append-icon="mdi-paperclip"
						append-outer-icon="mdi-send"
						clear-icon="mdi-close-circle"
						clearable
						filled
						auto-grow
						label="Note"
						rows="4"
						row-height="30"
						shaped
						@click:append="attachFile"
						@click:append-outer="insertNote"
						@click:clear="clearText"
					/>
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

@Component
export default class NoteForm extends Vue {
	@Prop({ type: String, required: true }) relatedCollectionName!: string;
	@Prop({ type: String, required: true }) relatedDocId!: string;

	text: string = '';

	attachFile() {
		console.log('Attach file');
	}

	clearText() {
		this.text = '';
	}

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

		// console.log('Insert note:', note);
	}
}
</script>
