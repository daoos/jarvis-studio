/**
 * To use this mixin, parent component has to define `moduleName` in data.
 * It will fetch module name information depending url `id` parameter.
 */

import { Component, Vue } from 'vue-property-decorator';
import { AnyObject } from '@/types';
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

	moduleName: string = '';
	isNotFound: boolean = false;
	item: AnyObject = {};
	isLoading: boolean = true;

	mounted() {
		if (!this.moduleName) throw new Error('Parent component has to define `moduleName` in data');
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

	get itemId(): string {
		return this.$route.params.id;
	}
}
