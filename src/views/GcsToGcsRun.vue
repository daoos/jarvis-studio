<template>
	<div>
		<DataManagementHeader
			:tabsItems="tabsItems"
			:headerTitle="headerTitle"
		></DataManagementHeader>
		<GcsToGcsRun />
	</div>
</template>

<script>
import GcsToGcsRun from "../components/GcsToGcsRun";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
	components: {
		GcsToGcsRun,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: "Gcs to Gcs",
			tabsItems: [
				{ id: 1, title: "Runs", link: "/runs/gcstogcs" },
				{ id: 2, title: "Configurations", link: "/conf/gcstogcs" },
				{ id: 3, title: "Documentation", link: "" }
			]
		};
	}
};
</script>
