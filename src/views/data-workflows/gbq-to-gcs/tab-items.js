export default {
	computed: {
		tabItems() {
			return [
				{ id: 1, title: 'Runs', link: { name: 'gbqToGcsRuns' } },
				{ id: 2, title: 'Configurations', link: { name: 'gbqToGcsConfs' } },
				{ id: 3, title: 'Documentation', link: '' }
			];
		}
	}
};
