<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component
			:type="type"
			:update-information="updateInformation"
			:tabs-items="itemTabsItems"
			:is-loading="isLoading"
			:is-not-found="isNotFound"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import HeaderInfosMixin from '../header-infos';
import ItemMixin from '@/mixins/data-workflows/item-mixin';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';

@Component
export default class WorkflowConfigurationsItemView extends Mixins(HeaderInfosMixin, ItemMixin) {
	moduleName: string = 'workflowConfs';

	get type() {
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
					collection: this.moduleName,
					activeHeader: true,
					viewId: this.item.id,
					viewType: 'conf',
					description: this.item.short_description
				}
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the Workflow configuration',
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
				component: 'parameters-table',
				props: {
					tableTitle: 'Target Job',
					description: 'Job to target',
					columns: [
						{
							label: 'Job ID',
							field: 'job_id'
						}
					],
					rows: [{ job_id: this.item.target_dag }],
					lineNumbers: true,
					searchOptionsEnabled: false
				}
			},
			{
				component: 'parameters-table',
				props: {
					tableTitle: 'Triggering Jobs',
					description: 'Jobs trigerring the workflow',
					columns: [
						{
							label: 'Job ID',
							field: 'job_id'
						}
					],
					rows: this.item.authorized_job_ids.map((val: string) => {
						return { job_id: val };
					}),
					lineNumbers: true,
					searchOptionsEnabled: true
				}
			}
		];
	}
}
</script>
