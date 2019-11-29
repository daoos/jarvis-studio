<template>
	<v-container fluid>
		<v-col>
			<h2 class="black--text pb-3">
				{{ properties.tableTitle }}

				<v-tooltip right>
					<template v-slot:activator="{ on }">
						<v-icon color="blue-grey lighten-5" dark v-on="on">info</v-icon>
					</template>
					<span>{{ properties.description }}</span>
				</v-tooltip>
			</h2>

			<vue-good-table
				:columns="properties.columns"
				:rows="properties.rows"
				:filterable="properties.filterable"
				:search-options="searchOptions"
				styleClass="vgt-table striped condensed"
				:line-numbers="properties.lineNumbers"
			>
				<div slot="emptystate">No information to display</div>
			</vue-good-table>
		</v-col>
	</v-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

export default {
	components: {
		VueGoodTable
	},
	data() {
		return {};
	},
	props: {
		properties: {
			type: Object,
			required: true
		}
	},
	computed: {
		searchOptions() {
			return {
				enabled: this.searchOptionsEnabled,
				placeholder: 'Search for parameters'
			};
		}
	}
};
</script>
