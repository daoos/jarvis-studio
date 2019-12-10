<template>
	<v-container fluid>
		<v-toolbar class="elevation-O" color="transparent">
			<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

			<v-spacer />

			<DataManagementFilters viewEnvironnement />
			<v-icon right @click="getFirestoreData" v-if="!isLoading">refresh</v-icon>
			<v-progress-circular indeterminate size="20" color="primary" v-if="isLoading" />
		</v-toolbar>

		<v-data-table
			:headers="headers"
			:items="formattedItems"
			:search="search"
			:loading="isLoading"
			:expanded="expanded"
			:sort-by.sync="pagination.sortBy"
			:sort-desc.sync="pagination.sortDesc"
			item-key="id"
			class="elevation-1"
		>
			<v-progress-linear v-slot:progress color="blue" indeterminate />

			<template v-slot:item.activated="{ item }">
				<configuration-status :item="item" :collection="moduleName" :is-activated="item.activated" />
			</template>

			<template v-slot:item.actions="{ item }">
				<v-icon small @click="toggleExpand(item)">remove_red_eye</v-icon>
			</template>

			<!-- Loop placed after default templates to override them if needed -->
			<template v-for="overriddenColumn in overriddenColumns" v-slot:[`item.${overriddenColumn}`]="{ item }">
				<slot :name="overriddenColumn" v-bind="{ item }" />
			</template>

			<template v-slot:expanded-item="{ headers }">
				<td :colspan="headers.length" class="pa-0">
					<v-card flat>
						<v-card-title>
							<span class="headline">{{ viewedItem.table_name }}</span>
							<v-spacer />
							<v-btn color="warning" fab small dark outlined>
								<v-icon @click="toggleExpand(viewedItem)">close</v-icon>
							</v-btn>
						</v-card-title>

						<v-card-text>
							<vue-json-pretty
								:data="viewedItem"
								:deep="5"
								:show-double-quotes="true"
								:show-length="true"
								:show-line="false"
							>
							</vue-json-pretty>
						</v-card-text>
					</v-card>
				</td>
			</template>

			<v-alert v-slot:no-results :value="true" color="error" icon="warning">
				Your search for "{{ search }}" found no results.
			</v-alert>
		</v-data-table>
	</v-container>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import DataManagementFilters from '../../common/DataManagementFilters';
import ConfigurationStatus from '../../common/configuration/ConfigurationStatus.vue';

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import store from '@/store';
import _ from 'lodash';
import Util from '@/util';

export default {
	name: 'listing-component',
	components: { VueJsonPretty, DataManagementFilters, ConfigurationStatus },
	props: {
		moduleName: {
			type: String,
			required: true
		},
		routeName: {
			type: String,
			required: true
		},
		headers: {
			type: Array,
			required: true
		},
		overriddenColumns: {
			type: Array
		}
	},
	data() {
		return {
			isLoading: false,
			search: '',
			expanded: [],
			pagination: {
				sortBy: 'table_name',
				sortDesc: true
			},
			viewedItem: {}
		};
	},
	mounted() {
		this.getFirestoreData();
	},
	methods: {
		toggleExpand(item) {
			const isAlreadyExpand = this.expanded.filter(expandedItem => expandedItem.id === item.id).length === 1;

			if (isAlreadyExpand) {
				this.expanded = [];
			} else {
				this.expanded = [item];
				this.viewedItem = item;
			}
		},
		async getFirestoreData() {
			// TODO: Use getItem mixin?

			const where = this.whereConfFilter;
			this.isLoading = true;
			try {
				await store.dispatch(`${this.moduleName}/closeDBChannel`, { clearModule: true });
				await store.dispatch(`${this.moduleName}/fetchAndAdd`, { where, limit: 0 });
			} catch (e) {
				console.log('Firestore Error catched:', e);
				this.isLoading = false;
			}
			this.isLoading = false;
		}
	},
	computed: {
		...mapState({
			firestoreItems(state) {
				return state[this.moduleName].data;
			}
		}),
		...mapGetters(['periodFiltered', 'whereConfFilter']),
		formattedItems() {
			const dataArray = Object.values(this.firestoreItems);
			const formattedData = dataArray.map(function(data) {
				return {
					//color for the activated status
					activeConfColor: Util.getActiveConfColor(data.activated)
				};
			});
			return _.merge(dataArray, formattedData);
		}
	},
	watch: {
		whereConfFilter: function() {
			this.getFirestoreData();
		}
	}
};
</script>
