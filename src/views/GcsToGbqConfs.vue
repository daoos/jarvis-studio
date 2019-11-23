<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<GcsToGbqConfs />
	</div>
</template>

<script>
import GcsToGbqConfs from "../components/GcsToGbqConfs";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
	components: {
		GcsToGbqConfs,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: "Storage to Table",
			tabsItems: [
				{ id: 1, title: "Runs", link: "/storagetotable/runs" },
				{ id: 2, title: "Configurations", link: "/storagetotable/confs" },
				{ id: 3, title: "Documentation", link: "" }
			]
		};
	}
};
</script>
