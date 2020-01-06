<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
		>
			<template v-slot:dag_id="{ item: { id, dag_id } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ dag_id }}</span>
				</router-link>
			</template>

			<template v-slot:status="{ item: { status } }">
				<v-chip v-if="status" :color="getStatusColor(status)" text-color="white" small class="text-lowercase">
					{{ status }}
				</v-chip>
			</template>

			<template v-slot:dag_execution_date="{ item: { dag_execution_date } }">
				{{ dag_execution_date | moment('YYYY/MM/DD - HH:mm') }}
			</template>
		</listing-component>
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/data-workflows/common/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent';

import HeaderInfosMixin from '../header-infos';

import { RUNS } from '@/constants/data-workflows/status';
import { VM_LAUNCHER_RUNS_ITEM } from '@/constants/router/routes-names';
import { getStatusColor } from '@/util/data-workflows/run';
import {
	ACCOUNT,
	ACTIONS,
	DAG_EXECUTION_DATE,
	DAG_ID,
	ENVIRONMENT,
	STATUS
} from '@/constants/data-workflows/listing/header-items';

export default {
	name: 'vm-launcher-runs-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [HeaderInfosMixin],
	data() {
		return {
			moduleName: 'vmLauncherRuns',
			overriddenColumns: ['dag_id', 'status', 'dag_execution_date']
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
			return VM_LAUNCHER_RUNS_ITEM;
		},
		headers() {
			return [ACCOUNT, ENVIRONMENT, DAG_ID, STATUS, DAG_EXECUTION_DATE, ACTIONS];
		}
	}
};
</script>
