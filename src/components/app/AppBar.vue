<template>
	<v-app-bar app dark color="primary" elevate-on-scroll dense>
		<v-app-bar-nav-icon v-if="!$vuetify.breakpoint.lgAndUp" @click="$emit('toggleNavigation')" />

		<account-selector />

		<v-spacer />

		<search-menu v-if="$vuetify.breakpoint.smAndUp" />

		<v-btn icon @click="$emit('toggleNotifications')">
			<v-badge color="red" overlap>
				<span slot="badge">2</span>
				<v-icon>notifications</v-icon>
			</v-badge>
		</v-btn>

		<v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
			<template v-slot:activator="{ on }">
				<v-btn icon large v-on="on">
					<v-avatar v-if="isAuthenticated && user.photoURL != null" size="32px">
						<img :src="user.photoURL" :alt="user.displayName" />
					</v-avatar>

					<v-avatar v-else size="32px">
						<v-icon dark>account_circle</v-icon>
					</v-avatar>
				</v-btn>
			</template>

			<v-list>
				<v-list-item
					v-for="(item, index) in userSettingsItems"
					:key="index"
					:href="item.href"
					:disabled="item.disabled"
					:target="item.target"
					@click="item.click"
					rel="noopener"
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-menu>

		<v-btn icon @click="toggleFullScreen">
			<v-icon>fullscreen</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
import AccountSelector from './sub-components/AccountSelector';
import SearchMenu from './sub-components/SearchMenu';

import { mapState } from 'vuex';

import userSettingsItems from '../../navigation/user-settings-items';

export default {
	name: 'app-bar',
	components: { AccountSelector, SearchMenu },
	data: () => ({
		userSettingsItems: userSettingsItems
	}),
	methods: {
		toggleFullScreen: () => {
			const doc = window.document;
			const docEl = doc.documentElement;
			const requestFullScreen =
				docEl.requestFullscreen ||
				docEl.mozRequestFullScreen ||
				docEl.webkitRequestFullScreen ||
				docEl.msRequestFullscreen;
			const cancelFullScreen =
				doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

			if (
				!doc.fullscreenElement &&
				!doc.mozFullScreenElement &&
				!doc.webkitFullscreenElement &&
				!doc.msFullscreenElement
			) {
				requestFullScreen.call(docEl);
			} else {
				cancelFullScreen.call(doc);
			}
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user
		})
	}
};
</script>
