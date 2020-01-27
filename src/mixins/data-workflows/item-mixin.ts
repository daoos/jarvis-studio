/**
 * To use this mixin, parent component has to define `moduleName` & `type` in data.
 * It will fetch module name information depending url `id` parameter.
 */

import { Component, Vue, Watch } from 'vue-property-decorator';
import { AnyObject, DataWorkflowsType, ConfigurationProps } from '@/types';
import { IPluginState } from 'vuex-easy-firestore/types/declarations';
import DataManagementHeader from '@/components/data-workflows/common/DataManagementHeader.vue';
import ItemComponent from '@/components/data-workflows/common/item/ItemComponent.vue';
import store from '@/store';
import { mapState } from 'vuex';

@Component({
	components: { DataManagementHeader, ItemComponent },
	computed: {
		...mapState({
			firestoreItem(state: any) {
				return state[this.moduleName].data;
			}
		})
	}
})
export default class ItemMixin extends Vue {
	private firestoreItem: any;
	archivedConfsModuleName: any;
	itemTabsItems: any;

	// TODO: See if this watch decorator is removable
	@Watch('firestoreItem')
	onFirestoreItemChanged(val: IPluginState) {
		const item = val[this.itemId];
		if (item) this.item = item;
	}

	moduleName: string = ''; // Overridden by component
	isNotFound: boolean = false;
	item: AnyObject = {};
	isLoading: boolean = true;

	mounted() {
		if (!this.moduleName) throw new Error('Parent component has to define `moduleName` in data');
		if (!this.type) throw new Error('Parent component has to define `type` in computed');
		this.getItem();
	}

	async getItem() {
		if (!this.firestoreItem[this.itemId]) await this.getFirestoreData();
		this.item = this.firestoreItem[this.itemId];

		if (!this.item) this.isNotFound = true;
		this.isLoading = false;
	}
	async getFirestoreData() {
		await store.dispatch(`${this.moduleName}/closeDBChannel`, { clearModule: true });
		await store.dispatch(`${this.moduleName}/fetchById`, this.itemId);
	}

	get updateInformation() {
		// TODO: Add UserSocialInfo
		return {
			update_date: this.item.update_date || this.item.updated_date,
			updated_by: this.item.updated_by
		};
	}

	get itemId(): string {
		return this.$route.params.id ? this.$route.params.id : ' ';
	}

	// Overridden by component
	get type(): DataWorkflowsType {
		return null;
	}

	get configurationProps(): ConfigurationProps {
		return {
			archivedConfsModuleName: this.archivedConfsModuleName,
			currentConfiguration: this.item,
			docId: this.itemId,
			isLoading: this.isLoading,
			isNotFound: this.isNotFound,
			moduleName: this.moduleName,
			tabsItems: this.itemTabsItems,
			type: this.type!,
			updateInformation: this.updateInformation
		};
	}
}
