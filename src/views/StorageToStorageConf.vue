<template>
	<div>
		<DataManagementHeader
			:tabsItems="tabsItems"
			:headerTitle="headerTitle"
		></DataManagementHeader>
		<StorageToStorageConf />
	</div>
</template>

<script>
import StorageToStorageConf from "../components/StorageToStorageConf";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
	components: {
		StorageToStorageConf,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: "Storage to Storage",
			tabsItems: [
				{ id: 1, title: "Runs", link: "/storagetostorage/runs" },
				{ id: 2, title: "Configurations", link: "/storagetostorage/confs" },
				{ id: 3, title: "Documentation", link: "" }
			]
		};
	}
};
</script>
