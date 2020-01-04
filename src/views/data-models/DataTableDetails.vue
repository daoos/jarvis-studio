<template>
	<DataTableDetailsContent />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataTableDetailsContent from '@/components/data-models/DataTableDetails.vue';

@Component({
	components: { DataTableDetailsContent }
})
export default class DataTableDetails extends Vue {}
</script>
