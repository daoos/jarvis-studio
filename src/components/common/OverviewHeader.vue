<template>
	<div>
		<v-row class="pl-5 pt-4 pr-5" v-if="properties.activeHeader">
			<span class="headline font-weight-black text-truncate complementary--text">{{ properties.viewId }}</span>

			<v-spacer />

			<v-btn text color="grey" @click="goBack()">
				Go Back
			</v-btn>

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

		<v-row class="pl-5 pt-4 pr-5" v-else>
			<span class="headline font-weight-bold">{{ properties.viewId }}</span>
		</v-row>

		<v-row class="pl-5 pr-5 pt-3 pb-3" v-if="properties.description">
			<span class="subheading">{{ properties.description }}</span>
		</v-row>
	</div>
</template>

<script>
import ActivatedStatusChip from '@/components/widgets/datatablewidgets/ActivatedStatusChip.vue';
import RunStatusChip from '@/components/widgets/datatablewidgets/RunStatusChip.vue';

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

<style lang="scss" scoped></style>
