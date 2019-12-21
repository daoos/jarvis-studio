<template>
	<v-container fluid>
		<v-col>
			<h2 class="black--text pb-3">
				{{ tableTitle }}
				<v-tooltip right>
					<template v-slot:activator="{ on }">
						<v-icon color="blue-grey lighten-5" dark v-on="on">info</v-icon>
					</template>
					<span>{{ description }}</span>
				</v-tooltip>
			</h2>
			<vue-good-table
				:columns="columns"
				:rows="rows"
				:filterable="filterable"
				:search-options="searchOptions"
				styleClass="vgt-table striped condensed"
				:line-numbers="lineNumbers"
			>
				<div slot="emptystate">
					No information to display
				</div>
			</vue-good-table>
		</v-col>
	</v-container>
</template>

<script>
// vue-good-table import the styles
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';

export default {
	components: {
		VueGoodTable
	},
	data() {
		return {};
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
		tableTitle: {
			type: String,
			default: 'Parameters Table Title'
		},
		description: {
			type: String,
			default: 'Parameters Table Description'
		},
		columns: {
			type: Array,
			default() {
				return [
					{
						label: 'Name',
						field: 'name'
					},
					{
						label: 'Age',
						field: 'age',
						type: 'number'
					},
					{
						label: 'Created On',
						field: 'createdAt',
						type: 'date',
						dateInputFormat: 'yyyy-MM-dd',
						dateOutputFormat: 'MMM Do yy'
					},
					{
						label: 'Percent',
						field: 'score',
						type: 'percentage'
					}
				];
			}
		},
		rows: {
			type: Array,
			required: true
		},
		fixedHeader: {
			type: Boolean,
			default: true
		},
		lineNumbers: {
			type: Boolean,
			default: true
		},
		searchOptionsEnabled: {
			type: Boolean,
			default: true
		},
		filterable: {
			type: Boolean,
			default: true
		},
		styleClass: {
			type: String,
			default: 'vgt-table striped'
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
