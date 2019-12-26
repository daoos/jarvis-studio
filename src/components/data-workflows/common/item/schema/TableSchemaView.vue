<template>
	<ParametersTable
		tableTitle="Table Schema"
		description="Schema details of the table"
		:columns="schemaColumns"
		:rows="schemaRows"
		vflexLength="xs12"
		:lineNumbers="false"
		:searchOptionsEnabled="true"
	/>
</template>

<script>
import ParametersTable from '@/components/data-workflows/common/item/parameters/ParametersTable';
export default {
	components: { ParametersTable },
	props: {
		schemaRows: {
			type: Array
		}
	},
	data() {
		return {
			schemaColumns: [
				{
					label: 'Name',
					field: 'name'
				},
				{
					label: 'Type',
					field: 'type'
				},
				{
					label: 'Mode',
					field: 'mode'
				},
				{
					label: 'Description',
					field: 'description'
				}
			]
		};
	}
};
</script>
