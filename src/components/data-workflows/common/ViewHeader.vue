<template>
	<div>
		<v-row v-if="properties.activeHeader" class="pl-5 pt-4 pr-5">
			<span class="headline font-weight-black text-truncate complementary--text">{{ properties.viewId }}</span>

			<v-spacer />

			<v-btn text color="grey" @click="goBack()">Go Back</v-btn>

			<configuration-status
				v-if="properties.viewType === 'conf'"
				:item="properties.item"
				:collection="properties.collection"
				:is-activated="properties.item.activated"
				:is-small="false"
				:is-label="true"
			/>

			<RunStatusChip
				v-if="properties.viewType === 'run'"
				:smallChip="false"
				:runStatus="runStatus"
				chipTextClass="text-uppercase"
				:chipLabel="true"
			/>
		</v-row>

		<v-row v-else class="pl-5 pt-4 pr-5">
			<span class="headline font-weight-bold">{{ properties.viewId }}</span>
		</v-row>

		<v-row v-if="properties.description" class="pl-5 pr-5 pt-3 pb-3">
			<span class="subheading">{{ properties.description }}</span>
		</v-row>
	</div>
</template>

<script>
import ConfigurationStatus from '../../common/configuration/ConfigurationStatus.vue';
import RunStatusChip from '../../common/chips/RunStatusChip.vue';

export default {
	name: 'view-header',
	components: { ConfigurationStatus, RunStatusChip },
	props: {
		properties: {
			type: Object,
			required: true
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
