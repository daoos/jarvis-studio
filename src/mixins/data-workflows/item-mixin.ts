/**
 * To use this mixin, parent component has to define `moduleName` in data.
 * It will fetch module name information depending url `id` parameter.
 */

import { Component, Vue } from 'vue-property-decorator';
// import { State } from 'vuex-class';
import DataManagementHeader from '@/components/data-workflows/common/DataManagementHeader.vue';
import ItemComponent from '@/components/data-workflows/common/item/ItemComponent.vue';
import store from '@/store';
import { mapState } from 'vuex';

type Item = { [index: string]: any };

@Component({
	components: { DataManagementHeader, ItemComponent },
	computed: {
		...mapState({
			firestoreItem(state) {
				return state[this.moduleName].data;
			}
		})
	}
})
export default class ItemMixin extends Vue {
	moduleName: string = '';
	isNotFound: boolean = false;
	item: Item = {};
	isLoading: boolean = true;

	// @State(state => state[this.moduleName].data) firestoreItem: Item = {};

	mounted() {
		// if (!this.moduleName) throw new Error('Parent component has to define `moduleName` in data');
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
