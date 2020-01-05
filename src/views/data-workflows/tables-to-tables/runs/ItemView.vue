<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<item-component :tabs-items="itemTabsItems" :is-loading="isLoading" />
	</div>
</template>

<script>
import TabsItemsMixin from '../tabs-items';
import ItemMixin from '@/mixins/data-workflows/item-mixin';

export default {
	name: 'tables-to-tables-runs-item-view',
	mixins: [TabsItemsMixin, ItemMixin],
	data() {
		return {
			moduleName: 'getGbqToGbqRuns'
		};
	},
	computed: {
		itemTabsItems() {
			if (!this.item) return [];

			return [
				{
					label: 'Run Details',
					href: 'run-details',
					component: {
						name: 'overview-component',
						props: {
							data: this.runDetailsData
						}
					}
				},
				{
					label: 'Configuration',
					href: 'configuration',
					component: {
						name: 'overview-component',
						props: {
							data: this.configurationData
						}
					}
				},
				{
					label: 'Tasks',
					href: 'tasks',
					component: {
						name: 'task-listing',
						props: {
							tasksConf: this.item.configuration_context.configuration.workflow,
							tasksSQL: this.item.configuration_context.sql,
							dagConf: this.item.configuration_context.configuration
						}
					}
				},
				{
					label: 'Full Json',
					href: 'full-json',
					component: {
						name: 'view-json',
						props: {
							json: this.item,
							jsonId: this.itemId
						}
					}
				},
				{
					label: 'Conversation',
					href: 'conversation',
					component: {
						name: 'view-conversation',
						props: {}
					}
				}
			];
		},
		runDetailsData() {
			if (!this.item) return;

			return [
				{
					component: 'view-header',
					props: {
						item: this.item,
						activeHeader: true,
						viewId: this.item.dag_id,
						viewType: 'run',
						runStatus: this.item.status
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the Tables to Tables Run',
						paramItems: [
							{
								id: 'account',
								label: 'Account',
								value: this.item.account
							},
							{
								id: 'environment',
								label: 'Environnement',
								value: this.item.environment
							}
						]
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Run Details',
						tooltip: true,
						description: 'Details of the Storage to Table Run',
						paramItems: [
							{
								id: 'dag_id',
								label: 'Dag Id',
								value: this.item.dag_id
							},
							{
								id: 'dag_type',
								label: 'Dag Type',
								value: this.item.dag_type
							},
							{
								id: 'job_id',
								label: 'Job Id',
								value: this.item.job_id
							},
							{
								id: 'dag_execution_date',
								label: 'Execution Date',
								value: this.item.dag_execution_date
							},
							{
								id: 'dag_run_id',
								label: 'Dag Run Id',
								value: this.item.dag_run_id
							},
							{
								id: 'dag_generator_version',
								label: 'Dag Generator Version',
								value: this.item.dag_generator_version
							}
						]
					}
				}
			];
		},
		configurationData() {
			if (!this.item) return;

			return [
				{
					component: 'view-header',
					props: {
						item: this.item,
						collection: this.moduleName,
						customKey: 'configuration_context.configuration',
						activeHeader: false,
						viewId: this.item.id,
						viewType: 'conf'
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the Tables to Tables configuration',
						paramItems: [
							{
								id: 'account',
								label: 'Account',
								value: this.item.account
							},
							{
								id: 'environment',
								label: 'Environment',
								value: this.item.environment
							},
							{
								id: 'default_gcp_project_id',
								label: 'Default Project',
								value: this.item.configuration_context.configuration.default_gcp_project_id,
								description: 'Default Project ID used by the tasks'
							},
							{
								id: 'default_bq_dataset',
								label: 'Default Dataset',
								value: this.item.configuration_context.configuration.default_bq_dataset,
								description: 'Default Dataset used by the tasks'
							},
							{
								id: 'start_date',
								label: 'Start Date',
								value: this.item.configuration_context.configuration.start_date,
								description: `Start date of the DAG. The format must be : "yyyy, MM, dd" Where : YYYY >= 1970 MM = [1, 12] DD = [1, 31]`
							},
							{
								id: 'catchup',
								label: 'Catchup',
								value: this.item.configuration_context.configuration.catchup,
								default: 'false',
								description: `This flag will specify to Composer/Airflow to backfill DAG runs upon deployment. If set to "true" AND the DAG is scheduled AND it's "start date" is in set in the past, Composer/Airflow will backfill and execute the DAG until the current date. If not set, the default value is : false`
							},
							{
								id: 'schedule_interval',
								label: 'Schedule Interval',
								value: this.item.configuration_context.configuration.schedule_interval,
								description: `If the DAG is scheduled, a CRON like string needs to be set, i.e every day at 7:00 => "0 7 * * *"  If scheduling is no required please set to : "None"`
							},
							{
								id: 'default_write_disposition',
								label: 'Default Write Disposition',
								value: this.item.configuration_context.configuration.default_write_disposition,
								description: 'Default Write Disposition used by the tasks'
							},
							{
								id: 'max_active_runs',
								label: 'Max Active Runs',
								value: this.item.configuration_context.configuration.max_active_runs,
								default: '1',
								description: 'Number of concurrent DAG runs for this DAG.'
							},
							{
								id: 'task_concurrency',
								label: 'Task Concurrency',
								value: this.item.configuration_context.configuration.task_concurrency,
								default: '5',
								description: 'Number of concurrent task executions within a DAG run.'
							}
						]
					}
				},
				{
					component: 'dag-chart',
					props: {
						dagId: this.item.configuration_context.configuration_id,
						task_dependencies: this.item.configuration_context.configuration.task_dependencies
					}
				}
			];
		}
	}
};
</script>
