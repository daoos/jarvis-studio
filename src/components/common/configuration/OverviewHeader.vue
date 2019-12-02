<template>
	<div>
		<v-row v-if="properties.activeHeader" class="pl-5 pt-4 pr-5">
			<span class="headline font-weight-black text-truncate complementary--text">{{ properties.viewId }}</span>

			<v-spacer />

			<v-btn text color="grey" @click="goBack()">Go Back</v-btn>

			<ActivatedStatusChip
				v-if="properties.viewType === 'conf'"
				:smallChip="false"
				:activatedConfStatus="properties.activatedConfStatus"
				chipTextClass="text-uppercase"
				:chipLabel="true"
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
import ActivatedStatusChip from '../../widgets/datatablewidgets/ActivatedStatusChip.vue';
import RunStatusChip from '../../widgets/datatablewidgets/RunStatusChip.vue';

export default {
	name: 'overview-header',
	components: { ActivatedStatusChip, RunStatusChip },
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
