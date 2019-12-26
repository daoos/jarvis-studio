<template>
	<div>
		<v-row v-if="activeHeader" class="pl-5 pt-4 pr-5">
			<span class="headline font-weight-black text-truncate complementary--text">{{ viewId }}</span>

			<v-spacer />

			<v-btn text color="grey" @click="goBack()">Go Back</v-btn>

			<configuration-status
				v-if="viewType === 'conf'"
				:item="item"
				:collection="collection"
				:is-activated="item.activated"
				:is-small="false"
				:is-label="true"
			/>

			<RunStatusChip
				v-if="viewType === 'run'"
				:smallChip="false"
				:runStatus="runStatus"
				chipTextClass="text-uppercase"
				:chipLabel="true"
			/>
		</v-row>

		<v-row v-else class="pl-5 pt-4 pr-5">
			<span class="headline font-weight-bold">{{ viewId }}</span>
		</v-row>

		<v-row v-if="description" class="pl-5 pr-5 pt-3 pb-3">
			<span class="subheading">{{ description }}</span>
		</v-row>
	</div>
</template>

<script>
import ConfigurationStatus from '../../../configuration/ConfigurationStatus.vue';
import RunStatusChip from '../../../runs/RunStatusChip.vue';

export default {
	name: 'view-header',
	components: { ConfigurationStatus, RunStatusChip },
	props: {
		activeHeader: {
			type: Boolean,
			required: true
		},
		viewId: {
			type: String,
			required: true
		},
		viewType: {
			type: String,
			required: true
		},
		item: {
			type: Object,
			required: true
		},
		collection: {
			type: String
		},
		runStatus: {
			type: String
		},
		description: {
			type: String
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
