<template>
	<div>
		<DataManagementHeader
			:tabsItems="tabsItems"
			:headerTitle="headerTitle"
		></DataManagementHeader>
		<StorageToStorageRuns />
	</div>
</template>

<script>
import StorageToStorageRuns from "@/components/StorageToStorageRuns.vue";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
	components: {
		StorageToStorageRuns,
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
