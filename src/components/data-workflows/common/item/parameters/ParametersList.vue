<template>
	<v-container fluid>
		<v-col>
			<h2 class="black--text pb-3">
				{{ groupTitle }}

				<v-tooltip right v-if="tooltip">
					<template v-slot:activator="{ on }">
						<v-icon color="blue-grey lighten-5" dark v-on="on">info</v-icon>
					</template>

					<span>{{ description }}</span>
				</v-tooltip>
			</h2>

			<ParametersItem v-for="paramItem in paramItems" :paramItem="paramItem" :key="paramItem.id" />

			<footer>
				<slot name="footer" />
			</footer>
		</v-col>
	</v-container>
</template>

<script>
import ParametersItem from './ParametersItem.vue';

export default {
	name: 'parameters-list',
	components: {
		ParametersItem
	},
	props: {
		vflexLength: {
			type: String,
			default: 'xs12'
		},
		vflexOffset: {
			type: String,
			default: 'offset-xs0'
		},
		groupTitle: {
			type: String,
			default: 'Parameters Group Title'
		},
		description: {
			type: String,
			default: 'Parameters List Description'
		},
		tooltip: {
			type: Boolean,
			default: false
		},
		paramItems: {
			type: Array,
			default() {
				return [
					{ id: 'account', label: 'Account', value: '000020' },
					{ id: 'environment', label: 'Environment', value: 'PROD' }
				];
			}
		}
	}
};
</script>
