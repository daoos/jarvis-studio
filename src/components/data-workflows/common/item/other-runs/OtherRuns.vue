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
import { AnyObject, Doc, ParametersTableColumn, Run } from '@/types';
import moment from 'moment';
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
	@Prop(Array) private additionalFields?: string[];

	private otherRuns: any;
	isLoading: boolean = false;

	mounted() {
		this.isLoading = true;

		const minDate = moment()
			.utc()
			.startOf('day')
			.subtract(1, 'month')
			.toISOString();

		this.$store
			.dispatch(`${this.moduleName}/fetchAndAdd`, {
				where: [
					['dag_execution_date', '>=', minDate],
					['job_id', '==', this.doc.job_id]
				]
			})
			.then(() => {
				this.isLoading = false;
			});
	}

	get columns(): Object[] {
		return [
			{ label: 'Account', field: 'account' },
			{ label: 'Environment', field: 'environment' },
			{ label: 'Dag_execution_date', field: 'dag_execution_date' },
			{ label: 'Dag_run_id', field: 'dag_run_id' },
			...this.additionalColumns,
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
				...this.getAdditionalRows(run),
				status: run.status
			});
		});

		return rows;
	}

	get additionalColumns(): ParametersTableColumn[] {
		if (!this.additionalFields) return [];

		let additionalColumns: ParametersTableColumn[] = [];

		this.additionalFields!.forEach((field: string) => {
			additionalColumns.push({ label: field, field });
		});

		return additionalColumns;
	}

	getAdditionalRows(run: Run): AnyObject {
		if (!this.additionalFields) return {};

		let additionalRows: AnyObject = {};

		this.additionalFields!.forEach((field: string) => {
			additionalRows[field] = run[field];
		});

		return additionalRows;
	}
}
</script>
