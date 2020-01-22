<template>
	<v-container>
		<v-row v-if="isLoading">
			<v-progress-linear :indeterminate="true" />
		</v-row>

		<v-row v-else-if="isNotFound">
			<v-col cols="12" offset="0" class="text-center">
				<p>Document not found</p>
				<v-btn @click="$router.go(-1)">Go Back</v-btn>
			</v-col>
		</v-row>

		<v-row v-else>
			<v-col cols="12" offset="0">
				<v-tabs v-model="activeTab" color="black" background-color="#E0E0E0" slider-color="primary" class="elevation-1">
					<v-tab v-for="tab in tabsItems" :key="tab.label" :href="`#${tab.href}`" v-text="tab.label" ripple />
					<v-spacer />
					<history-component
						v-if="showHistoryComponent"
						:email="updateInformation.updated_by"
						:updated-date="updateInformation.update_date"
					/>

					<v-tab-item v-for="tab in tabsItems" :key="tab.label" :value="tab.href">
						<component :is="tab.component.name" v-bind="tab.component.props" />
					</v-tab-item>
				</v-tabs>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import importedComponents from './imported-components';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';

@Component({
	components: { ...importedComponents }
})
export default class ItemComponent extends Vue {
	@Prop({ required: true }) type!: string;
	@Prop({ required: true }) tabsItems!: object[];
	@Prop({ required: true }) isLoading!: boolean;
	@Prop({ required: true }) isNotFound!: boolean;
	@Prop() updateInformation?: string;

	activeTab: null = null;

	get showHistoryComponent() {
		return this.type === CONFIGURATIONS;
	}
}
</script>
