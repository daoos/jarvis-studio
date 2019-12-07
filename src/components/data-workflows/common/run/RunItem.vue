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
import OverviewComponent from '../OverviewComponent';
import ViewJson from '../../../common/ViewJson';
import ViewConversation from '../ViewConversation';

export default {
	name: 'table-to-storage-run-item',
	components: { OverviewComponent, ViewJson, ViewConversation },
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
