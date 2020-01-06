<template>
	<v-chip :color="colorRunStatus" text-color="white" :small="smallChip" :class="chipTextClass" :label="chipLabel">
		{{ runStatus }}
	</v-chip>
</template>

<script>
import { getStatusColor } from '@/util/data-workflows/run';

export default {
	props: {
		runStatus: {
			type: String,
			default: 'Undefined'
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
		colorRunStatus() {
			return getStatusColor(this.runStatus);
		}
	}
};
</script>
