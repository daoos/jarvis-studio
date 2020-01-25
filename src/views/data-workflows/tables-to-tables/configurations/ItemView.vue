<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component v-bind="configurationProps" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { DataWorkflowsType } from '@/types';
import HeaderInfosMixin from '../header-infos';
import ItemMixin from '@/mixins/data-workflows/item-mixin';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import { getGbqToGbqConfs } from '@/store/modules/easy-firestore/get-gbq-to-gbq-confs';
import { getGbqToGbqConfArchive } from '@/store/modules/easy-firestore/get-gbq-to-gbq-conf-archive';

@Component
export default class TablesToTablesConfigurationsItemView extends Mixins(HeaderInfosMixin, ItemMixin) {
	moduleName: string = getGbqToGbqConfs.moduleName;
	archivedConfsModuleName: string = getGbqToGbqConfArchive.moduleName;

	get type(): DataWorkflowsType {
		return CONFIGURATIONS;
	}

	get itemTabsItems() {
		if (Object.keys(this.item).length === 0) return [];

		return [
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
						type: CONFIGURATIONS,
						tasksConf: this.item.configuration.workflow,
						tasksSQL: this.item.sql,
						dagConf: this.item.configuration
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
	}

	get configurationData() {
		return [
			{
				component: 'view-header',
				props: {
					item: this.item,
					customKey: 'configuration',
					collection: this.moduleName,
					activeHeader: true,
					viewId: this.item.configuration.configuration_id
						? this.item.configuration.configuration_id
						: this.item.configuration.dag_name,
					viewType: 'conf',
					description: this.item.configuration.short_description
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
							value: this.item.configuration.default_gcp_project_id,
							description: 'Default Project ID used by the tasks'
						},
						{
							id: 'default_bq_dataset',
							label: 'Default Dataset',
							value: this.item.configuration.default_bq_dataset,
							description: 'Default Dataset used by the tasks'
						},
						{
							id: 'start_date',
							label: 'Start Date',
							value: this.item.configuration.start_date,
							description: `Start date of the DAG. The format must be : "yyyy, MM, dd" Where : YYYY >= 1970 MM = [1, 12] DD = [1, 31]`
						},
						{
							id: 'catchup',
							label: 'Catchup',
							value: this.item.configuration.catchup,
							default: false,
							description: `This flag will specify to Composer/Airflow to backfill DAG runs upon deployment. If set to "true" AND the DAG is scheduled AND it's "start date" is in set in the past, Composer/Airflow will backfill and execute the DAG until the current date. If not set, the default value is : false`
						},
						{
							id: 'schedule_interval',
							label: 'Schedule Interval',
							value: this.item.configuration.schedule_interval,
							description: `If the DAG is scheduled, a CRON like string needs to be set, i.e every day at 7:00 => "0 7 * * *"  If scheduling is no required please set to : "None"`
						},
						{
							id: 'default_write_disposition',
							label: 'Default Write Disposition',
							value: this.item.configuration.default_write_disposition,
							description: 'Default Write Disposition used by the tasks'
						},
						{
							id: 'max_active_runs',
							label: 'Max Active Runs',
							value: this.item.configuration.max_active_runs,
							default: '1',
							description: 'Number of concurrent DAG runs for this DAG.'
						},
						{
							id: 'task_concurrency',
							label: 'Task Concurrency',
							value: this.item.configuration.task_concurrency,
							default: '5',
							description: 'Number of concurrent task executions within a DAG run.'
						}
					]
				}
			},
			{
				component: 'dag-chart',
				props: {
					dagId: this.item.configuration.dag_name,
					task_dependencies: this.item.configuration.task_dependencies
				}
			},
			{
				component: 'create-update-conf-overview',
				props: {
					creationDate: this.item.creation_date,
					updateDate: this.item.update_date || this.item.updated_date,
					createdBy: this.item.created_by,
					updatedBy: this.item.updated_by
				}
			}
		];
	}
}
</script>
