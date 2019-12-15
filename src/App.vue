<template>
	<v-app>
		<app-bar v-if="isAuthenticated" @toggleNavigation="toggleNavigation" @toggleNotifications="toggleNotifications" />

		<v-navigation-drawer
			v-if="isAuthenticated"
			v-model="navigationDrawer.open"
			:fixed="navigationDrawer.fixed"
			:clipped="navigationDrawer.clipped"
			:permanent="navigationDrawer.permanent"
			:mini-variant="navigationDrawer.mini"
			app
			dark
			class="menu"
			width="300"
		>
			<navigation-content
				:drawer="navigationDrawer"
				:analytics-items="analyticsItems"
				:settings-items="settingsItems"
			/>
		</v-navigation-drawer>

		<v-navigation-drawer v-if="isAuthenticated" temporary :right="true" v-model="showNotifications" fixed app>
			<notification-content :show-notifications="showNotifications" @closeNotifications="toggleNotifications" />
		</v-navigation-drawer>

		<v-content>
			<transition name="fade" mode="out-in">
				<keep-alive>
					<router-view :key="$route.fullPath" />
				</keep-alive>
			</transition>
		</v-content>

		<v-footer v-if="isAuthenticated" class="menu" app dark>
			<footer-content />
		</v-footer>
	</v-app>
</template>

<script>
import AppBar from './components/app/AppBar';
import FooterContent from './components/app/FooterContent';
import NavigationContent from './components/app/NavigationContent';
import NotificationContent from './components/app/NotificationContent';

import { mapState } from 'vuex';
import analyticsItems from './navigation/analytics-items';
import settingsItems from './navigation/settings-items';

export default {
	name: 'app',
	components: { AppBar, FooterContent, NavigationContent, NotificationContent },
	data: () => ({
		navigationDrawer: {
			open: true,
			clipped: false,
			fixed: true,
			permanent: true,
			mini: false
		},
		showNotifications: false,
		analyticsItems: analyticsItems,
		settingsItems: settingsItems
	}),
	mounted() {
		this.makeNavigationResponsive();
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated
		})
	},
	watch: {
		'$vuetify.breakpoint.lgAndUp'(isUp) {
			this.makeNavigationResponsive(isUp);
		}
	},
	methods: {
		toggleNavigation() {
			this.navigationDrawer.open = !this.navigationDrawer.open;
		},
		toggleNotifications() {
			this.showNotifications = !this.showNotifications;
		},
		makeNavigationResponsive(isUp) {
			if (isUp) {
				this.navigationDrawer.open = true;
				this.navigationDrawer.permanent = true;
			} else {
				this.navigationDrawer.open = false;
				this.navigationDrawer.permanent = false;
			}
		}
	}
};
</script>

<style lang="scss">
@import 'scss/transitions/fade';
</style>
