<template>
	<v-app-bar app dark color="primary" elevate-on-scroll dense>
		<v-app-bar-nav-icon v-if="!$vuetify.breakpoint.lgAndUp" @click="$emit('toggleNavigation')" />

		<account-selector />

		<v-spacer />

		<search-menu v-if="$vuetify.breakpoint.smAndUp" />

		<v-tooltip v-slot:activator="{ on }" bottom>
			<v-btn icon @click="$emit('toggleNotifications')">
				<v-badge color="red" overlap>
					<span slot="badge">2</span>
					<v-icon>notifications</v-icon>
				</v-badge>
			</v-btn>
		</v-tooltip>

		<v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
			<template v-slot:activator="{ on }">
				<v-btn icon large v-on="on">
					<v-avatar size="32px" v-if="isAuthenticated && user.photoURL != null">
						<img :src="user.photoURL" :alt="user.displayName" />
					</v-avatar>
					<v-avatar size="32px" v-else>
						<v-icon dark>account_circle</v-icon>
					</v-avatar>
				</v-btn>
			</template>

			<v-list>
				<v-list-item
					v-for="(item, index) in userSettingsItems"
					:key="index"
					:href="item.href"
					@click="item.click"
					:disabled="item.disabled"
					:target="item.target"
					rel="noopener"
				>
					<v-list-item-action v-if="item.icon">
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-menu>

		<v-btn icon @click="handleFullScreen()">
			<v-icon>fullscreen</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
import AccountSelector from "../widgets/filters/AccountSelector";
import SearchMenu from "./sub-components/SearchMenu";

import { mapState } from "vuex";
import router from "@/router";
import Util from "@/util";

export default {
	name: "app-bar",
	components: { AccountSelector, SearchMenu },
	methods: {
		handleFullScreen() {
			Util.toggleFullScreen();
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user
		}),
		userSettingsItems() {
			return [
				{
					title: "Profile",
					href: "#",
					icon: "account_circle",
					click: () => {
						router.push({ name: "userProfile" });
					}
				},
				{
					title: "Logout",
					href: "#",
					icon: "exit_to_app",
					click: () => {
						this.$store.dispatch("userSignOut");
					}
				}
			];
		}
	}
};
</script>
