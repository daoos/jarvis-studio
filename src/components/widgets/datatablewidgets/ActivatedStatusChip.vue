<template>
	<v-chip
		:color="colorActivatedConfStatus"
		text-color="white"
		:small="smallChip"
		:class="chipTextClass"
		:label="chipLabel"
		>{{ labelActivatedConfStatus }}
	</v-chip>
</template>

<script>
import Util from "@/util";

export default {
	components: {},
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
			default: "text-capitalize"
		}
	},
	data: () => ({}),
	created() {},
	methods: {},
	computed: {
		colorActivatedConfStatus() {
			return Util.getActiveConfColor(this.activatedConfStatus);
		},
		labelActivatedConfStatus() {
			return Util.getActiveConfLabel(this.activatedConfStatus);
		}
	}
};
</script>
