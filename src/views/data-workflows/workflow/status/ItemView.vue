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
	name: 'workflow-status-item-view',
	mixins: [TabsItemsMixin, ItemMixin],
	data() {
		return {
			moduleName: 'workflowStatus'
		};
	},
	computed: {
		itemTabsItems() {
			return [
				{
					label: 'Status',
					href: 'configuration',
					component: {
						name: 'overview-component',
						props: {
							data: this.statusData
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
		statusData() {
			if (!this.item) return;

			return [
				{
					component: 'view-header',
					props: {
						item: this.item,
						collection: this.moduleName,
						activeHeader: false,
						viewId: this.item.id,
						viewType: 'status'
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the Storage to Storage configuration',
						paramItems: [
							{
								id: 'jobs',
								label: 'Jobs',
								value: Object.keys(this.item.jobs).length
							},
							{
								id: 'last_modified',
								label: 'Las modified',
								value: this.item.last_modified
							},
							{
								id: 'target_dag',
								label: 'Target Dag',
								value: this.item.target_dag
							},
							{
								id: 'target_dag_last_executed',
								label: 'Target Dag last executed',
								value: this.item.target_dag_last_executed
							}
						]
					}
				}
			];
		}
	}
};
</script>
