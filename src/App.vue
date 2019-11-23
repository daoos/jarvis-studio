<template>
	<v-app>
		<app-bar
			v-if="!$route.meta.public"
			@toggleNavigation="toggleNavigation"
			@toggleNotifications="toggleNotifications"
		/>

		<v-navigation-drawer
			v-if="!$route.meta.public"
			v-model="drawer.open"
			:fixed="drawer.fixed"
			:clipped="drawer.clipped"
			:permanent="drawer.permanent"
			:mini-variant="drawer.mini"
			app
			dark
			class="menu"
			width="300"
		>
			<navigation-content :drawer="drawer" :analytics-items="analyticsItems" />
		</v-navigation-drawer>

		<v-navigation-drawer v-if="!$route.meta.public" temporary :right="true" v-model="showNotifications" fixed app>
			<notification-content :show-notifications="showNotifications" @closeNotifications="toggleNotifications" />
		</v-navigation-drawer>

		<v-content>
			<keep-alive>
				<!-- TODO: Add transition -->
				<router-view :key="$route.fullpath" />
			</keep-alive>
		</v-content>

		<v-footer v-if="!$route.meta.public" app dark class="menu">
			<footer-content />
		</v-footer>
	</v-app>
</template>

<script>
import AppBar from "./components/layout/AppBar";
import FooterContent from "./components/layout/FooterContent";
import NavigationContent from "./components/layout/NavigationContent";
import NotificationContent from "./components/layout/NotificationContent";

import router from "@/router";
import { mapState } from "vuex";
import { analyticsItems } from "./paths";

export default {
	name: "app",
	components: { AppBar, FooterContent, NavigationContent, NotificationContent },
	data: () => ({
		drawer: {
			open: true,
			clipped: false,
			fixed: true,
			permanent: true,
			mini: false,
			temporary: false
		},
		showNotifications: false,
		analyticsItems: analyticsItems
	}),
	mounted() {
		this.makeDrawerResponsive();
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
	},
	watch: {
		"$vuetify.breakpoint.lgAndUp"() {
			this.makeDrawerResponsive();
		}
	},
	methods: {
		toggleNavigation() {
			this.drawer.open = !this.drawer.open;
		},
		toggleNotifications() {
			this.showNotifications = !this.showNotifications;
		},
		makeDrawerResponsive() {
			if (!this.$vuetify.breakpoint.lgAndUp) {
				this.drawer.open = false;
				this.drawer.permanent = false;
				this.drawer.temporary = true;
				this.drawer.clipped = false;
			} else {
				this.drawer.open = true;
				this.drawer.permanent = true;
				this.drawer.temporary = false;
				this.drawer.clipped = false;
			}
		}
	}
};
</script>
