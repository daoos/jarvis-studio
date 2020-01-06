<template>
	<v-toolbar dense tabs color="primary" dark>
		<v-toolbar-title class="pl-2 display-1">{{ workflowName }}</v-toolbar-title>

		<v-tabs slider-color="white" slot="extension" color="transparent" background-color="primary">
			<v-tab v-for="tabsItem in tabsItems" :key="tabsItem.id" :to="tabsItem.link">
				<span class="pl-2 pr-2">{{ tabsItem.title }}</span>
			</v-tab>
		</v-tabs>
	</v-toolbar>
</template>

<script>
import { getWorkflowName } from '@/util/data-workflows';

export default {
	props: {
		tabsItems: {
			type: Array,
			required: true
		}
	},
	computed: {
		workflowName() {
			return getWorkflowName(this.$route.name) || '';
		}
	}
};
</script>
