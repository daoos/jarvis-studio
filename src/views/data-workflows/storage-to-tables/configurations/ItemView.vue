<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<runs-item :tabs-items="itemTabsItems" :is-loading="isLoading" />
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/app/headers/DataManagementHeader';
import RunsItem from '@/components/data-workflows/common/runs/RunsItem';

import TabsItemsMixin from '../tabs-items';
import GetItemMixin from '@/mixins/get-item-mixin';

export default {
	name: 'storage-to-tables-configurations-listing-view',
	components: { DataManagementHeader, RunsItem },
	mixins: [TabsItemsMixin, GetItemMixin],
	data: () => ({
		item: null,
		moduleName: 'storageToTablesConfs'
	}),
	computed: {
		itemTabsItems() {
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
						collection: this.moduleName,
						activeHeader: true,
						viewId: this.item.id,
						viewType: 'conf',
						description: null
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the Table to Storage Run',
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
							}
						]
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Main parameters',
						tooltip: true,
						description: 'Main parameters of the Table to Storage Run',
						paramItems: [
							{
								id: 'firestore_conf_doc_id',
								label: 'Configuration Id',
								value: this.item.firestore_conf_doc_id
							},
							{
								id: 'destination_bucket',
								label: 'Destination Bucket',
								value: this.item.destination_bucket
							},
							{
								id: 'output_filename',
								label: 'Output Finame',
								value: this.item.output_filename
							}
						]
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Run Details',
						tooltip: true,
						description: 'Details of the Table to Storage Run',
						paramItems: [
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
						activeHeader: false,
						viewId: this.item.id,
						viewType: 'conf',
						description: null,
						runStatus: this.item.status
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the Table to Storage configuration',
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
							}
						]
					}
				}
			];
		}
	}
};
</script>
