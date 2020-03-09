<template>
	<div>
		<v-toolbar dense tabs color="primary" class="white--text">
			<v-toolbar-title class="pl-2 display-1">Profile</v-toolbar-title>

			<v-tabs v-model="activeTab" slot="extension" background-color="primary" dark>
				<v-tab v-for="item in tabsItems" :key="item.label">
					{{ item.label }}
				</v-tab>
			</v-tabs>
		</v-toolbar>

		<v-tabs-items v-model="activeTab">
			<v-tab-item v-for="tab in tabsItems" :key="tab.label">
				<component :is="tab.component" />
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ConfigurationsTab from '@/components/settings/profile/ConfigurationsTab.vue';
import InformationTab from '@/components/settings/profile/InformationTab.vue';
import NotesTab from '@/components/settings/profile/NotesTab.vue';

@Component({
	components: { ConfigurationsTab, InformationTab, NotesTab }
})
export default class Profile extends Vue {
	activeTab: null = null;

	get tabsItems() {
		return [
			{ label: 'My info', href: 'information', component: InformationTab },
			{ label: 'My configurations', href: 'configurations', component: ConfigurationsTab },
			{ label: 'My notes', href: 'notes', component: NotesTab }
		];
	}
}
</script>
