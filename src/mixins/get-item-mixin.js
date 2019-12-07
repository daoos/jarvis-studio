import { mapState } from 'vuex';
import store from '@/store';

/**
 * To use this mixin, parent component has to define `moduleName` in data.
 * It will fetch module name information depending url `id` parameter.
 */

export default {
	data: () => ({
		isLoading: true
	}),
	mounted() {
		if (!this.moduleName) throw new Error('Parent component has to define `moduleName` in data');
		this.getItem();
	},
	methods: {
		async getItem() {
			this.isLoading = true;
			if (!this.firestoreItem[this.itemId]) await this.getFirestoreData();
			this.item = this.firestoreItem[this.itemId];
			this.isLoading = false;
		},
		async getFirestoreData() {
			try {
				await store.dispatch(`${this.moduleName}/closeDBChannel`, { clearModule: true });
				await store.dispatch(`${this.moduleName}/fetchById`, this.itemId);
			} catch (e) {
				console.error(e);
			}
		}
	},
	computed: {
		...mapState({
			firestoreItem(state) {
				return state[this.moduleName].data;
			}
		}),
		itemId() {
			return this.$route.params.id;
		}
	}
};
