<template>
	<div>
		<data-overview-header title="Page not found" />
		<data-overview-content />
	</div>
</template>

<script>
import DataOverviewHeader from '@/components/app/data-overview/DataOverviewHeader';
import DataOverviewContent from '@/components/app/data-overview/DataOverviewContent';

export default {
	name: 'not-found',
	components: { DataOverviewHeader, DataOverviewContent }
};
</script>
