<template>
	<div>
		<v-list class="pa-0">
			<v-list-item>
				<v-list-item-content v-if="!drawer.mini">
					<v-list-item-title>
						<router-link to="/" class="no-underline">
							<h2>{{ appName }}</h2>
						</router-link>
					</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action>
					<v-btn icon @click.stop="drawer.mini = !drawer.mini">
						<v-icon large color="secondary">
							{{ drawer.mini ? 'keyboard_arrow_right' : 'keyboard_arrow_left' }}
						</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>

		<v-list v-if="!drawer.mini" subheader dense>
			<v-subheader class="text-uppercase">Data models</v-subheader>
			<tree-view />
		</v-list>

		<v-list subheader dense>
			<v-subheader v-if="!drawer.mini" class="text-uppercase">Data Workflows</v-subheader>

			<v-tooltip
				v-slot:activator="{ on }"
				v-for="item in analyticsItems"
				:key="item.title"
				:disabled="!drawer.mini"
				right
			>
				<v-list-item :to="item.link" exact dense slot="activator">
					<v-list-item-action>
						<v-icon v-html="item.icon" dense />
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-tooltip>
		</v-list>

		<v-list subheader dense>
			<v-subheader v-if="!drawer.mini" class="text-uppercase">Settings</v-subheader>

			<template v-for="setting in settingsItems">
				<v-list-item
					v-if="!setting.hasOwnProperty('displayRule') || setting.displayRule()"
					:key="setting.title"
					:to="setting.link"
					dense
				>
					<v-list-item-action>
						<v-icon v-html="setting.icon" dense />
					</v-list-item-action>

					<v-list-item-content>
						<v-list-item-title v-text="setting.title" />
					</v-list-item-content>
				</v-list-item>
			</template>
		</v-list>
	</div>
</template>

<script>
import TreeView from '../data-models/TreeView';

import packageJson from '../../../package';

export default {
	name: 'navigation-content',
	components: { TreeView },
	props: {
		drawer: {
			type: Object,
			required: true
		},
		analyticsItems: {
			type: Array,
			required: true
		},
		settingsItems: {
			type: Array,
			required: true
		}
	},
	computed: {
		appName() {
			const appName = packageJson.name.replace('-', ' ');
			return `${appName.charAt(0).toUpperCase()}${appName.slice(1)}`;
		}
	}
};
</script>
