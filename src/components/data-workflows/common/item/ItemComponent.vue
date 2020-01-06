<template>
	<v-container>
		<v-row v-if="isLoading">
			<v-progress-linear :indeterminate="true" />
		</v-row>

		<v-row v-else>
			<v-col cols="12" offset="0">
				<v-tabs v-model="activeTab" color="black" background-color="#E0E0E0" slider-color="primary" class="elevation-1">
					<v-tab v-for="tab in tabsItems" :key="tab.label" :href="`#${tab.href}`" v-text="tab.label" ripple />

					<v-tab-item v-for="tab in tabsItems" :key="tab.label" :value="tab.href">
						<component :is="tab.component.name" v-bind="tab.component.props" />
					</v-tab-item>
				</v-tabs>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import CreateUpdateConfOverview from '@/components/data-workflows/configuration/CreateUpdateConfOverview';
import OverviewComponent from './overview/OverviewComponent';
import TableSchemaView from '@/components/data-workflows/common/item/schema/TableSchemaView';
import TaskListing from '@/components/data-workflows/common/item/tasks/TaskListing';
import ViewJson from './json/ViewJson';
import ViewConversation from './conversation/ViewConversation';

export default {
	name: 'item-component',
	components: { CreateUpdateConfOverview, OverviewComponent, TableSchemaView, TaskListing, ViewJson, ViewConversation },
	props: {
		tabsItems: {
			type: Array,
			required: true
		},
		isLoading: {
			type: Boolean,
			required: true
		}
	},
	data: () => ({
		activeTab: null
	})
};
</script>
