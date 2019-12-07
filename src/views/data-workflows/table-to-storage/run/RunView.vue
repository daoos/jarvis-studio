<template>
	<div>
		<data-management-header :tabs-items="headerTabsItems" />
		<run-item v-if="conf" :tabs-items="itemTabsItems" :is-loading="isLoading" />
	</div>
</template>

<script>
import RunItem from '@/components/data-workflows/common/run/RunItem';
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';

import HeaderTabsItemsMixin from '../header-tabs-items';
import RunViewMixin from '@/mixins/run-view-mixin';

export default {
	components: { RunItem, DataManagementHeader },
	mixins: [HeaderTabsItemsMixin, RunViewMixin],
	data: () => ({
		conf: null
	}),
	computed: {
		overviewData() {
			return [
				{
					component: 'view-header',
					props: {
						item: this.conf,
						collection: 'tableToStorageConfs',
						activeHeader: true,
						viewId: this.confId,
						viewType: 'conf',
						description: null
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
								value: this.conf.account
							},
							{
								id: 'environment',
								label: 'Environment',
								value: this.conf.environment
							}
						]
					}
				},
				{
					component: 'parameters-table',
					props: {
						tableTitle: 'Destination Storage',
						description: 'Destination Storage of the file to export',
						columns: [
							{
								label: 'Type',
								field: 'source_type',
								width: '100px'
							},
							{
								label: 'Storage ID',
								field: 'gcs_dest_bucket',
								width: '200px'
							},
							{
								label: 'Destination Folder',
								field: 'gcs_dest_prefix',
								width: '200px'
							},
							{
								label: 'Output Filename',
								field: 'output_filename',
								width: '200px'
							}
						],
						rows: [
							{
								source_type: 'GCS',
								gcs_dest_bucket: this.conf.gcs_dest_bucket,
								gcs_dest_prefix: this.conf.gcs_dest_prefix,
								output_filename: this.conf.output_filename
							}
						],
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: 'false'
					}
				}
			];
		},
		itemTabsItems() {
			return [
				{
					label: 'Run Details',
					href: 'run-details',
					component: {
						name: 'overview-component',
						props: {
							data: this.overviewData
						}
					}
				},
				{
					label: 'Configuration',
					href: 'configuration',
					component: {
						name: 'overview-component',
						props: {
							data: this.overviewData
						}
					}
				},
				{
					label: 'Full Json',
					href: 'full-json',
					component: {
						name: 'view-json',
						props: {
							json: this.conf,
							jsonId: this.confId
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
	}
};
</script>
