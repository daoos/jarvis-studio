<template>
	<div id="appRoot">
		<template v-if="!$route.meta.public">
			<v-app id="inspire">
				<v-navigation-drawer
					:clipped="drawer.clipped"
					:fixed="drawer.fixed"
					:permanent="drawer.permanent"
					:mini-variant="drawer.mini"
					v-model="drawer.open"
					app
					dark
					class="menu"
					width="300"
				>
					<v-toolbar flat class="transparent" dense>
						<v-list class="pa-0" :class="{ 'list-border-bottom': drawer.mini }">
							<v-list-item>
								<v-list-item-action v-if="!drawer.mini">
									<v-icon large color="complementary"
										>keyboard_arrow_right</v-icon
									>
								</v-list-item-action>
								<v-list-item-content v-if="!drawer.mini">
									<v-list-item-title>
										<h2 v-text="appName"></h2>
									</v-list-item-title>
								</v-list-item-content>
								<!-- <v-list-item-action>
                    <v-btn icon @click.stop="drawer.mini = !drawer.mini">
                        <v-icon v-html="drawer.mini ? 'keyboard_arrow_right' : 'keyboard_arrow_left'"></v-icon>
                    </v-btn>
                </v-list-item-action> -->
							</v-list-item>
						</v-list>
					</v-toolbar>
					<v-divider></v-divider>
					<v-tooltip right :disabled="!drawer.mini">
						<v-toolbar flat class="transparent" dense slot="activator">
							<v-list
								class="pa-0"
								:class="{ 'list-border-bottom': drawer.mini }"
							>
								<v-list-item to="/" exact>
									<v-list-item-action>
										<v-icon>home</v-icon>
									</v-list-item-action>
									<v-list-item-content>
										<v-list-item-title>Project Overview</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-toolbar>
						<span>Project Overview</span>
					</v-tooltip>
					<v-divider></v-divider>
					<v-divider></v-divider>
					<v-list
						subheader
						:class="{ 'list-border-bottom': drawer.mini }"
						v-if="!drawer.mini"
					>
						<v-subheader>DATA MODELS</v-subheader>
						<DatamodelTreeview class="ml-1"></DatamodelTreeview>
					</v-list>
					<v-list
						subheader
						:class="{ 'list-border-bottom': drawer.mini }"
						v-else
					>
						<v-tooltip>
							<v-list-item @click="drawer.mini = !drawer.mini">
								<v-list-item-action
									><v-icon>aspect_ratio</v-icon></v-list-item-action
								>
								<v-list-item-content
									><v-list-item-title>DATA MODELS</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<span>DATA MODELS</span>
						</v-tooltip>
					</v-list>
					<v-divider></v-divider>

					<v-list subheader :class="{ 'list-border-bottom': drawer.mini }">
						<v-subheader>DATA WORFLOWS</v-subheader>
						<template v-for="item in analyticsItems">
							<v-tooltip right :disabled="!drawer.mini" :key="item.icon">
								<v-list-item
									:key="item.icon"
									:to="item.link"
									exact
									slot="activator"
								>
									<v-list-item-action>
										<v-icon v-html="item.icon"></v-icon>
									</v-list-item-action>
									<v-list-item-content>
										<v-list-item-title v-text="item.title"></v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<span v-text="item.title"></span>
							</v-tooltip>
						</template>
					</v-list>
					<v-divider></v-divider>
					<v-list subheader :class="{ 'list-border-bottom': drawer.mini }">
						<v-subheader>SETTINGS</v-subheader>
						<v-list-item :to="{ path: '/settings/users' }">
							<v-list-item-action>
								<v-icon>supervised_user_circle</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>Users</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item :to="{ path: '/settings/accounts' }">
							<v-list-item-action>
								<v-icon>business</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>Accounts</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item :to="{ path: '/settings/gcpcloudfunctions' }">
							<v-list-item-action>
								<v-icon>settings_ethernet</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title
									>Cloud Function Configurations</v-list-item-title
								>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-navigation-drawer>

				<v-toolbar
					dark
					app
					color="primary"
					flat
					dense
					:fixed="toolbar.fixed"
					:clipped-left="toolbar.clippedLeft"
				>
					<v-toolbar-side-icon
						v-if="!$vuetify.breakpoint.lgAndUp"
						@click.stop="toggleDrawer"
					></v-toolbar-side-icon>
					<AccountSelector viewAccount></AccountSelector>
					<v-spacer></v-spacer>
					<SearchMenu v-if="$vuetify.breakpoint.smAndUp"></SearchMenu>
					<v-tooltip bottom>
						<v-btn
							icon
							@click.stop="rightDrawer = !rightDrawer"
							slot="activator"
						>
							<v-badge color="red" overlap>
								<span slot="badge">2</span>
								<v-icon>notifications</v-icon>
							</v-badge>
						</v-btn>
						<span>2 unread notifications</span>
					</v-tooltip>
					<v-menu
						offset-y
						origin="center center"
						:nudge-bottom="10"
						transition="scale-transition"
					>
						<template v-slot:activator="{ on }">
							<v-btn icon large v-on="on">
								<v-avatar
									size="32px"
									v-if="isAuthenticated && user.photoURL != null"
								>
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
				</v-toolbar>
				<v-navigation-drawer
					temporary
					:right="true"
					v-model="rightDrawer"
					fixed
					app
				>
					<v-toolbar flat prominent dark class="primary">
						<v-toolbar-title>Notifications</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon @click.stop="rightDrawer = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
					<v-list subheader dense>
						<v-subheader>All notifications</v-subheader>
						<v-list-item>
							<v-list-item-action>
								<v-icon>person_add</v-icon>
							</v-list-item-action>
							<v-list-item-title>
								12 new users registered
							</v-list-item-title>
						</v-list-item>
						<v-divider></v-divider>
						<v-list-item>
							<v-list-item-action>
								<v-icon>data_usage</v-icon>
							</v-list-item-action>
							<v-list-item-title>
								DB overloaded 80%
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-navigation-drawer>
				<v-content>
					<router-view></router-view>
				</v-content>
				<v-footer
					app
					:fixed="footer.fixed"
					:clipped-left="footer.clippedLeft"
					dark
					class="menu"
				>
					<span class="caption mx-3">&copy; 2019, JARVIS by Fashion Data</span>
				</v-footer>
			</v-app>
		</template>
		<template v-else>
			<transition>
				<keep-alive>
					<router-view :key="$route.fullpath"></router-view>
				</keep-alive>
			</transition>
		</template>
	</div>
</template>
<script>
import router from "@/router";
import { mapState } from "vuex";
import Util from "@/util";
import DatamodelTreeview from "./components/widgets/datamodel/DatamodelTreeview";
import AccountSelector from "./components/widgets/filters/AccountSelector";
import SearchMenu from "./components/widgets/filters/SearchMenu";

export default {
	name: "App",
	components: {
		AccountSelector,
		SearchMenu,
		DatamodelTreeview
	},
	data: () => ({
		appName: "JARVIS STUDIO",
		drawer: {
			// sets the open status of the drawer
			open: true,
			// sets if the drawer is shown above (false) or below (true) the toolbar
			clipped: false,
			// sets if the drawer is CSS positioned as 'fixed'
			fixed: true,
			// sets if the drawer remains visible all the time (true) or not (false)
			permanent: true,
			// sets the drawer to the mini variant, showing only icons, of itself (true)
			// or showing the full drawer (false)
			mini: false,
			//A temporary drawer sits above its application and uses a scrim (overlay)
			//to darken the background
			temporary: false
		},
		toolbar: {
			//
			fixed: true,
			// sets if the toolbar contents is leaving space for drawer (false) or not (true)
			clippedLeft: false
		},
		footer: {
			// sets the CSS position of the footer
			fixed: true,
			// sets if the footer is full width (true) or gives space to the drawer (false)
			clippedLeft: true
		},
		rightDrawer: false,
		analyticsItems: [
			{
				icon: "swap_horiz",
				title: "GCS to GCS",
				link: "/runs/gcstogcs"
			},
			{
				icon: "flare",
				title: "Storage to Storage",
				link: "/storagetostorage/runs"
			},
			{
				icon: "vertical_split",
				title: "Storage to Table",
				link: "/storagetotable/runs"
			},
			{
				icon: "device_hub",
				title: "Tables to Tables",
				link: "/tablestotables/runs"
			},
			{
				icon: "file_copy",
				title: "Table to Storage",
				link: "/runs/gbqtogcs"
			},
			{
				icon: "dns",
				title: "VM Launcher",
				link: "/runs/vmlauncher"
			},
			{
				icon: "power",
				title: "Worklow",
				link: "/status/workflow"
			}
		]
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
			//adjust the responsive drawer
			this.makeDrawerResponsive();
		}
	},
	methods: {
		// make drawer esponsive
		makeDrawerResponsive() {
			if (!this.$vuetify.breakpoint.lgAndUp) {
				this.drawer.open = false;
				this.drawer.permanent = false;
				this.drawer.temporary = true;
				(this.drawer.clipped = false), (this.toolbar.clippedLeft = true);
			} else {
				this.drawer.open = true;
				this.drawer.permanent = true;
				this.drawer.temporary = false;
				(this.drawer.clipped = false), (this.toolbar.clippedLeft = false);
			}
		},
		// toggles the drawer variant (mini/full)
		toggleMiniDrawer() {
			this.drawer.mini = !this.drawer.mini;
		},
		// toggles the drawer type (permanent vs temporary) or shows/hides the drawer
		toggleDrawer() {
			this.drawer.open = !this.drawer.open;
		},
		// Handle Full Screen App
		handleFullScreen() {
			Util.toggleFullScreen();
		}
	}
};
</script>

<style scoped lang="scss">
@import "~vuetify/src/components/VBtn/_variables.scss";

.bottom-menu {
	position: absolute;
	width: 100%;
	bottom: 0;
}
.searching {
	overflow: hidden;
	width: 208px;
	padding-left: 8px;
	transition: $primary-transition;
}
.searching--closed {
	padding-left: 0;
	width: 0;
}
.searching > * {
	right: 8px;
}
.searching--closed > * {
	display: none;
}
.list-border-bottom {
	border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
