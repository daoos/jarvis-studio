<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
		>
			<template v-slot:id="{ item: { id } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ id }}</span>
				</router-link>
			</template>

			<template v-slot:jobs="{ item: { jobs } }">
				{{ Object.keys(jobs).length }}
			</template>

			<template v-slot:triggered_jobs="{ item: { jobs } }">
				<v-progress-circular
					:rotate="270"
					:size="35"
					:value="(Object.values(jobs).filter(job => (job.executed = true)).length / Object.keys(jobs).length) * 100"
					color="green"
				>
					{{ Object.values(jobs).filter(job => (job.executed = true)).length }}
				</v-progress-circular>
			</template>

			<template v-slot:last_update_date_from_now="{ item: { last_modified } }">
				{{ last_modified | moment('from', 'now') }}
			</template>

			<template v-slot:last_fire_date_from_now="{ item: { target_dag_last_executed } }">
				{{ target_dag_last_executed | moment('from', 'now') }}
			</template>
		</listing-component>
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/data-workflows/common/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent';

import TabsItemsMixin from '../tabs-items';

import { RUNS } from '@/constants/data-workflows/status';
import { WORKFLOW_STATUS_ITEM } from '@/constants/router/routes-names';
import { getStatusColor } from '@/util/data-workflows/run';
import {
	ACTIONS,
	ID,
	JOBS,
	LAST_FIRE_DATE_FROM_NOW,
	LAST_UPDATE_FROM_NOW,
	TRIGGERED_JOBS
} from '@/constants/data-workflows/listing/header-items';

export default {
	name: 'workflow-status-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [TabsItemsMixin],
	data() {
		return {
			moduleName: 'workflowStatus',
			overriddenColumns: ['id', 'jobs', 'triggered_jobs', 'last_update_date_from_now', 'last_fire_date_from_now']
		};
	},
	methods: {
		getStatusColor(status) {
			return getStatusColor(status);
		}
	},
	computed: {
		listingType() {
			return RUNS;
		},
		routeName() {
			return WORKFLOW_STATUS_ITEM;
		},
		headers() {
			return [ID, JOBS, TRIGGERED_JOBS, LAST_UPDATE_FROM_NOW, LAST_FIRE_DATE_FROM_NOW, ACTIONS];
		}
	}
};
</script>
