export default {
	computed: {
		tabsItems() {
			return [
				{ id: 1, title: 'Runs', link: { name: 'TableToStorageRuns' } },
				{ id: 2, title: 'Configurations', link: { name: 'TableToStorageConfs' } },
				{ id: 3, title: 'Documentation', link: '' }
			];
		}
	}
};
