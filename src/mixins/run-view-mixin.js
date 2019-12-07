import { mapState } from 'vuex';
import store from '@/store';

// TODO: Make requests generic

export default {
	data: () => ({
		isLoading: true
	}),
	mounted() {
		this.getConf();
	},
	methods: {
		async getConf() {
			this.isLoading = true;
			if (!this.getGbqToGcsRuns[this.confId]) await this.getFirestoreData();
			this.conf = this.getGbqToGcsRuns[this.confId];
			this.isLoading = false;
		},
		async getFirestoreData() {
			try {
				await store.dispatch('getGbqToGcsRuns/closeDBChannel', { clearModule: true });
				await store.dispatch('getGbqToGcsRuns/fetchById', this.confId);
			} catch (e) {
				console.error(e);
			}
		}
	},
	computed: {
		confId() {
			return this.$route.params.id;
		},
		...mapState({
			getGbqToGcsRuns: state => state.getGbqToGcsRuns.data
		})
	}
};
