<template>
	<table-details-content />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TableDetailsContent from '@/components/data-models/TableDetails.vue';

@Component({
	components: { TableDetailsContent }
})
export default class DataTableDetails extends Vue {}
</script>
