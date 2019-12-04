<template>
	<v-chip
		:color="colorActivatedConfStatus"
		text-color="white"
		:small="smallChip"
		:class="chipTextClass"
		:label="chipLabel"
	>
		{{ labelActivatedConfStatus }}
	</v-chip>
</template>

<script>
import { getActiveConfColor, getActiveConfLabel } from '@/util/data-workflows/configuration';

export default {
	name: 'activated-status-chip',
	props: {
		activatedConfStatus: {
			type: Boolean,
			default: undefined
		},
		smallChip: {
			type: Boolean,
			default: true
		},
		chipLabel: {
			type: Boolean,
			default: false
		},
		chipTextClass: {
			type: String,
			default: 'text-capitalize'
		}
	},
	computed: {
		colorActivatedConfStatus() {
			return getActiveConfColor(this.activatedConfStatus);
		},
		labelActivatedConfStatus() {
			return getActiveConfLabel(this.activatedConfStatus);
		}
	}
};
</script>
