<template>
	<div>
		<v-list class="pa-0">
			<v-list-item>
				<v-list-item-content v-if="!drawer.mini">
					<v-list-item-title>
						<h2 class="text-uppercase">{{ appName }}</h2>
					</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action>
					<v-btn icon @click.stop="drawer.mini = !drawer.mini">
						<v-icon large color="complementary">
							{{ drawer.mini ? "keyboard_arrow_right" : "keyboard_arrow_left" }}
						</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>

		<v-divider v-if="!drawer.mini"></v-divider>

		<v-list class="pa-0">
			<v-list-item to="/" exact>
				<v-list-item-action>
					<v-icon>home</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Project Overview</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-divider></v-divider>

		<v-list v-if="!drawer.mini" subheader>
			<v-subheader>DATA MODELS</v-subheader>
			<data-model-tree-view />
		</v-list>

		<v-divider></v-divider>

		<v-list subheader>
			<v-subheader v-if="!drawer.mini">DATA WORFLOWS</v-subheader>
			<template v-for="item in analyticsItems">
				<v-tooltip v-slot:activator="{ on }" right :disabled="!drawer.mini" :key="item.icon">
					<v-list-item :key="item.icon" :to="item.link" exact slot="activator">
						<v-list-item-action>
							<v-icon v-html="item.icon"></v-icon>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title v-text="item.title" />
						</v-list-item-content>
					</v-list-item>
				</v-tooltip>
			</template>
		</v-list>

		<v-divider />

		<v-list subheader>
			<v-subheader v-if="!drawer.mini">SETTINGS</v-subheader>

			<v-list-item :to="{ path: '/settings/user/profile' }">
				<v-list-item-action>
					<v-icon>account_circle</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Profile</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

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
					<v-list-item-title>
						Cloud Function Configurations
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</div>
</template>

<script>
import DataModelTreeView from "../widgets/datamodel/DatamodelTreeview";

import packageJson from "../../../package";

export default {
	name: "navigation-content",
	components: { DataModelTreeView },
	props: {
		drawer: {
			type: Object,
			required: true
		},
		analyticsItems: {
			type: Array,
			required: true
		}
	},
	computed: {
		appName() {
			return packageJson.name.replace("-", " ");
		}
	}
};
</script>
