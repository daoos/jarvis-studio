<template>
	<div>
		<SettingsHeader
			:tabsItems="tabsItems"
			:headerTitle="headerTitle"
		></SettingsHeader>
		<Users />
	</div>
</template>

<script>
import Users from "../components/UserProfile";
import SettingsHeader from "@/components/widgets/layout/SettingsHeader.vue";

export default {
	components: {
		Users,
		SettingsHeader
	},
	data() {
		return {
			headerTitle: "Settings",
			tabsItems: [
				{ id: 1, title: "Profile", link: "/settings/user/profile" },
				{ id: 2, title: "Users", link: "/settings/users" },
				{ id: 3, title: "Accounts", link: "/settings/accounts" },
				{ id: 4, title: "Cloud Functions", link: "/settings/gcpcloudfunctions" }
			]
		};
	}
};
</script>
