<template>
	<div class="pt-6">
		<div v-if="isLoading" class="text-center">
			<v-progress-circular indeterminate size="42" color="primary" />
		</div>

		<div v-else-if="hasError">
			<h2 class="mb-4 error--text">Error while fetching log file</h2>
			<p>Code: {{ errorMsg.code_ }}</p>
			<p>Message: {{ errorMsg.message_ }}</p>
			<p>Server response: {{ errorMsg.serverResponse_ }}</p>
		</div>

		<div v-else>
			<p>LogsComponent</p>
			<pre>{{ logs }}</pre>

			<v-btn color="primary" class="learn-more-btn" @click="downloadLogFile">Download log file</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { firebase } from '@/config/firebase';

@Component
export default class LogsComponent extends Vue {
	isLoading: boolean = false;
	hasError: boolean = false;
	errorMsg: Object | null = null;
	fileUrl: string = '';
	logs: string | null = null;

	@Prop({ required: true }) private folderPath!: string;
	@Prop({ required: true }) private fileName!: string;

	mounted() {
		const logsFolder = firebase
			.storage()
			.ref()
			.child(`logs/${this.folderPath}`);
		const logFile = logsFolder.child(this.fileName);

		this.isLoading = true;

		logFile
			.getDownloadURL()
			.then(url => {
				console.log('URL:', url);
				console.log('File content:', this.getLogFileContent(url));
				this.fileUrl = url;
				this.logs = this.getLogFileContent(url);
				this.isLoading = false;
			})
			.catch(err => {
				this.hasError = true;
				this.errorMsg = err;
				this.isLoading = false;
			});
	}

	getLogFileContent(url: string): string {
		const request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.send(null);

		request.onreadystatechange = () => {
			if (request.readyState === 4 && request.status === 200) {
				const type = request.getResponseHeader('Content-Type');

				if (type.indexOf('text') !== 1) {
					return request.responseText;
				}
			}
		};
	}

	downloadLogFile(): void {
		window.open(this.fileUrl, '_blank');
	}
}
</script>
