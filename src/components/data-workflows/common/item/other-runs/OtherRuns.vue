<template>
	<div class="d-flex justify-center">
		<v-progress-circular v-if="isLoading" indeterminate size="54" color="primary" class="ma-5" />
		<parameters-table
			v-else
			tableTitle="Other Runs"
			description="Other runs with the same job_id"
			:columns="columns"
			:rows="rows"
			:searchOptionsEnabled="true"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject, Doc, Run } from '@/types';
import { mapState } from 'vuex';
import ParametersTable from '@/components/data-workflows/common/item/parameters/ParametersTable.vue';

@Component({
	components: { ParametersTable },
	computed: {
		...mapState({
			otherRuns(state: any) {
				return state[this.moduleName].data;
			}
		})
	}
})
export default class OtherRuns extends Vue {
	@Prop({ required: true }) private doc!: Doc;
	@Prop({ required: true }) private moduleName!: string;

	private otherRuns: any;
	isLoading: boolean = false;

	mounted() {
		this.isLoading = true;
		this.$store.dispatch(`${this.moduleName}/fetchAndAdd`, { where: [['job_id', '==', this.doc.job_id]] }).then(() => {
			this.isLoading = false;
		});
	}

	get columns(): Object[] {
		return [
			{ label: 'Account', field: 'account' },
			{ label: 'Environment', field: 'environment' },
			{ label: 'Dag_execution_date', field: 'dag_execution_date' },
			{ label: 'Dag_run_id', field: 'dag_run_id' },
			{ label: 'Status', field: 'status' }
		];
	}

	get rows(): Object[] {
		let rows: AnyObject[] = [];

		Object.keys(this.otherRuns).forEach((runId: string) => {
			const run: Run = this.otherRuns[runId];

			rows.push({
				account: run.account,
				environment: run.environment,
				dag_execution_date: run.dag_execution_date,
				dag_run_id: run.dag_run_id,
				status: run.status
			});
		});

		return rows;
	}
}
</script>
