<template>
	<v-container grid-list-xl>
		<v-row>
			<v-col cols="12" offset="0">
				<HeaderDocView
					:viewId="runId"
					:runStatus="run.status"
					:activeHeader="activeHeader"
					viewType="run"
				/>
				<ParametersList
					groupTitle="Context"
					description="Context of the Storage to Table Run"
					:paramItems="paramContext"
				/>
				<ParametersList
					groupTitle="Run Details"
					description="Details of the Storage to Table Run"
					:paramItems="paramItems"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import HeaderDocView from "@/components/widgets/parameters/HeaderDocView.vue";
import ParametersList from "@/components/widgets/parameters/ParametersList.vue";
export default {
	components: {
		HeaderDocView,
		ParametersList
	},
	props: {
		run: {
			type: Object,
			default: undefined
		},
		runId: {
			type: String,
			default: "Run ID"
		},
		activeHeader: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({}),
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	},
	computed: {
		paramContext() {
			return [
				{ id: "account", label: "Account", value: this.run.account },
				{
					id: "environment",
					label: "Environnement",
					value: this.run.environment
				}
			];
		},
		paramItems() {
			return [
				{
					id: "dag_id",
					label: "Dag Id",
					value: this.run.dag_id
				},
				{
					id: "dag_type",
					label: "Dag Type",
					value: this.run.dag_type
				},
				{
					id: "job_id",
					label: "Job Id",
					value: this.run.job_id
				},
				{
					id: "dag_execution_date",
					label: "Execution Date",
					value: this.run.dag_execution_date
				},
				{
					id: "dag_run_id",
					label: "Dag Run Id",
					value: this.run.dag_run_id
				},
				{
					id: "dag_generator_version",
					label: "Dag Generator Version",
					value: this.run.dag_generator_version
				}
			];
		}
	}
};
</script>

<style></style>
