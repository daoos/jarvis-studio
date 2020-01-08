<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component :tabs-items="itemTabsItems" :is-loading="isLoading" :is-not-found="isNotFound" />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import HeaderInfosMixin from '../header-infos';
import ItemMixin from '@/mixins/data-workflows/item-mixin';

@Component
export default class VmLauncherConfigurationsItemView extends Mixins(HeaderInfosMixin, ItemMixin) {
	moduleName: string = 'vmLauncherConfs';

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
					viewType: 'conf'
				}
			},
			{
				component: 'parameters-list',
				props: {
					groupTitle: 'Context',
					tooltip: true,
					description: 'Context of the VM Launcher configuration',
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
</script>
