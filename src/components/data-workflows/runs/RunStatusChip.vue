<template>
	<v-chip class="text-uppercase" :color="color" text-color="white" :small="isSmall" :label="isLabel">
		{{ status }}
	</v-chip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RunStatus } from '@/types';
import { getStatusColor } from '@/util/data-workflows/run';

@Component
export default class RunStatusChip extends Vue {
	@Prop({ required: true }) private status!: RunStatus;
	@Prop(Boolean) private isSmall!: boolean;
	@Prop(Boolean) private isLabel!: boolean;

	get color() {
		return getStatusColor(this.status);
	}
}
</script>
