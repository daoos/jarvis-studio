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
			<!-- TODO: Handle errors -->

			<div v-if="Object.keys(logs).length === 1">
				<v-btn color="primary" class="learn-more-btn" @click="downloadLogFile(Object.keys(logs)[0])">
					Download log file
				</v-btn>
				<pre v-for="logKey in Object.keys(logs)" :key="logKey">{{ logs[logKey] }}</pre>
			</div>

			<v-tabs
				v-else
				v-model="activeTab"
				color="black"
				background-color="#E0E0E0"
				slider-color="primary"
				class="elevation-1"
			>
				<v-tab v-for="logKey in Object.keys(logs)" :key="logKey" :href="`#${logKey}`" v-text="logKey" ripple />

				<v-tab-item v-for="logKey in Object.keys(logs)" :key="logKey" :value="logKey">
					<v-btn color="primary" class="learn-more-btn" @click="downloadLogFile(logKey)">Download log file</v-btn>
					{{ logs[logKey] }}
				</v-tab-item>
			</v-tabs>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject } from '@/types';
import { firebase } from '@/config/firebase';
import { Base64 } from 'js-base64';

@Component
export default class LogsComponent extends Vue {
	isLoading: boolean = false;
	hasError: boolean = false;
	errorMsg: Object | null = null;
	logs: Object = {};
	activeTab: null = null;

	@Prop({ required: true }) private dagId!: string;
	@Prop({ required: true }) private taskId!: string;
	@Prop({ required: true }) private dagRunId!: string;
	@Prop({ required: true }) private dagExecutionDate!: string;

	mounted() {
		this.getLogs();
	}

	getLogs(): void {
		let decodedLogFiles: AnyObject = [];
		const getAirflowLogs = firebase.functions().httpsCallable('fd-io-api-airflow-logs-manager');

		this.isLoading = true;

		getAirflowLogs({
			dagId: this.dagId,
			taskId: this.taskId,
			dagRunId: this.dagRunId,
			dagExecutionDate: this.dagExecutionDate
		}).then(res => {
			const data = res.data;

			Object.keys(data).forEach(key => {
				decodedLogFiles[key] = Base64.decode(data[key]);
			});

			this.isLoading = false;
			this.logs = decodedLogFiles;
		});
	}

	downloadLogFile(fileName: string): void {
		const logsFolder = firebase
			.storage()
			.ref()
			.child(`logs/${this.dagId}/${this.taskId}/${this.dagExecutionDate}`);

		logsFolder
			.child(fileName)
			.getDownloadURL()
			.then(url => {
				window.open(url, '_blank');
			});
	}
}
</script>
