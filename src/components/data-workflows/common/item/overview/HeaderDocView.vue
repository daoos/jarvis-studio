<template>
	<div>
		<v-row class="pl-5 pt-4 pr-5" v-if="activeHeader">
			<span class="headline font-weight-black text-truncate complementary--text">{{ viewId }}</span>

			<v-spacer />

			<v-btn text color="grey" @click="goBack()">
				Go Back
			</v-btn>

			<configuration-status
				v-if="viewType === 'conf'"
				:item="item"
				:collection="collection"
				:custom-key="customKey"
				:is-small="false"
				:is-activated="activatedConfStatus"
				:is-label="true"
			/>

			<RunStatusChip
				v-if="viewType === 'run'"
				:status="runStatus"
				:doc-id="item.id"
				:collection="collection"
				is-label
			/>
		</v-row>
		<v-row class="pl-5 pt-4 pr-5" v-else>
			<span class="headline font-weight-bold">{{ viewId }}</span>
		</v-row>
		<v-row class="pl-5 pr-5 pt-3 pb-3" v-if="description">
			<span class="subheading">{{ description }}</span>
		</v-row>
	</div>
</template>

<script>
import ConfigurationStatus from '@/components/data-workflows/common/configuration/ConfigurationStatus.vue';
import RunStatusChip from '@/components/data-workflows/common/runs/RunStatusChip.vue';

export default {
	components: {
		ConfigurationStatus,
		RunStatusChip
	},
	data() {
		return {};
	},
	props: {
		item: {
			type: Object,
			required: true
		},
		collection: {
			type: String,
			required: true
		},
		customKey: {
			type: String,
			default: null
		},
		viewType: {
			type: String,
			default: 'conf'
		},
		viewId: {
			type: String,
			default: 'View ID'
		},
		activatedConfStatus: {
			type: Boolean,
			default: undefined
		},
		runStatus: {
			type: String,
			default: undefined
		},
		activeHeader: {
			type: Boolean,
			default: true
		},
		description: {
			type: String,
			default: undefined
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
