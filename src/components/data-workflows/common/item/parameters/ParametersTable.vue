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
				<div slot="emptystate">No information to display</div>

				<template slot="table-row" slot-scope="props">
					<component v-if="props.column.field === 'actions'" :is="overriddenRow(props.column.field).component" />
					<span v-else>{{ props.formattedRow[props.column.field] }}</span>
				</template>
			</vue-good-table>
		</v-col>
	</v-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import ActionsRow from './overridden-rows/ActionsRow';

export default {
	components: {
		ActionsRow,
		VueGoodTable
	},
	props: {
		tableTitle: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		columns: {
			type: Array,
			required: true
		},
		rows: {
			type: Array,
			required: true
		},
		overriddenRows: {
			type: Array
		},
		filterable: {
			type: Boolean,
			default: true
		},
		lineNumbers: {
			type: Boolean
		},
		searchOptionsEnabled: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		overriddenRow(rowName) {
			return this.overriddenRows ? this.overriddenRows.find(row => row.name === rowName) : null;
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
